"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Utensils,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProtectedRoute } from "@/components/admin/protected-route";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  popular: boolean;
  spicy: boolean;
  image?: string;
}

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "Mains",
    popular: false,
    spicy: false,
    image: "",
  });

  const categories = [
    "all",
    "Appetizers",
    "Salads",
    "Mains",
    "Seafood",
    "Desserts",
  ];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/menu-items");
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error("Failed to fetch menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "Mains",
      popular: false,
      spicy: false,
      image: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const res = await fetch(`/api/menu-items/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMenuItems(menuItems.filter((i) => i.id !== id));
        toast.success("Menu item deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/menu-items/${editingItem.id}`
        : "/api/menu-items";

      const res = await fetch(url, {
        method: editingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          editingItem
            ? "Menu item updated successfully"
            : "Menu item added successfully",
        );
        setIsDialogOpen(false);
        fetchMenuItems();
      } else {
        toast.error("Failed to save menu item");
      }
    } catch (error) {
      console.error("Error saving menu item:", error);
      toast.error("Failed to save menu item");
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Utensils className="h-16 w-16 animate-pulse mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />

        {/* Content */}
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Menu Management</h1>
              <p className="text-muted-foreground mt-1">
                Add, edit, or remove menu items from your restaurant
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      {item.popular && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                      {item.spicy && (
                        <Badge className="bg-red-500">🌶️ Spicy</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold text-primary">
                    ${item.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {item.description}
                  </p>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No menu items found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first menu item"}
                </p>
                {!searchTerm && selectedCategory === "all" && (
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Menu Item
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
              <DialogDescription>
                Fill in all menu item details. Required fields are marked with
                *.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Dish name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price *</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value),
                      })
                    }
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Appetizers">Appetizers</SelectItem>
                    <SelectItem value="Salads">Salads</SelectItem>
                    <SelectItem value="Mains">Main Courses</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the dish..."
                  rows={3}
                  required
                />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/dish.jpg"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) =>
                      setFormData({ ...formData, popular: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Mark as Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.spicy}
                    onChange={(e) =>
                      setFormData({ ...formData, spicy: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Mark as Spicy 🌶️</span>
                </label>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
