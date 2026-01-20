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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus, Pencil, Trash2, Car, Save, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProtectedRoute } from "@/components/admin/protected-route";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: number;
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  image: string;
  features: string[];
  specs: {
    engine: string;
    hp: number;
    torque: string;
    acceleration: string;
    fuelEconomy: string;
    transmission: string;
    drivetrain: string;
    fuelTank: string;
    seating: number;
    cargo: string;
  };
  colors: string[];
  description: string;
  gallery: string[];
  popular: boolean;
  isNew: boolean;
}

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    category: "Sedan",
    price: 0,
    year: 2024,
    mileage: "New",
    fuel: "Hybrid",
    transmission: "Automatic",
    image: "",
    features: [],
    specs: {
      engine: "",
      hp: 0,
      torque: "",
      acceleration: "",
      fuelEconomy: "",
      transmission: "",
      drivetrain: "",
      fuelTank: "",
      seating: 5,
      cargo: "",
    },
    colors: [],
    description: "",
    gallery: [],
    popular: false,
    isNew: false,
  });

  const [featureInput, setFeatureInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormData({
      name: "",
      category: "Sedan",
      price: 0,
      year: 2024,
      mileage: "New",
      fuel: "Hybrid",
      transmission: "Automatic",
      image: "",
      features: [],
      specs: {
        engine: "",
        hp: 0,
        torque: "",
        acceleration: "",
        fuelEconomy: "",
        transmission: "",
        drivetrain: "",
        fuelTank: "",
        seating: 5,
        cargo: "",
      },
      colors: [],
      description: "",
      gallery: [],
      popular: false,
      isNew: false,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVehicles(vehicles.filter((v) => v.id !== id));
        toast.success("Vehicle deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingVehicle
        ? `/api/vehicles/${editingVehicle.id}`
        : "/api/vehicles";

      const res = await fetch(url, {
        method: editingVehicle ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          editingVehicle
            ? "Vehicle updated successfully"
            : "Vehicle added successfully",
        );
        setIsDialogOpen(false);
        fetchVehicles();
      } else {
        toast.error("Failed to save vehicle");
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error("Failed to save vehicle");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== index),
    });
  };

  const addColor = () => {
    if (colorInput.trim()) {
      setFormData({
        ...formData,
        colors: [...(formData.colors || []), colorInput.trim()],
      });
      setColorInput("");
    }
  };

  const removeColor = (index: number) => {
    setFormData({
      ...formData,
      colors: (formData.colors || []).filter((_, i) => i !== index),
    });
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData({
        ...formData,
        gallery: [...(formData.gallery || []), galleryInput.trim()],
      });
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: (formData.gallery || []).filter((_, i) => i !== index),
    });
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Car className="h-16 w-16 animate-pulse mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg">Loading vehicles...</p>
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Vehicle Management</h1>
              <p className="text-muted-foreground mt-1">
                Add, edit, or remove vehicles from your inventory
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      {vehicle.isNew && <Badge>New</Badge>}
                      {vehicle.popular && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(vehicle)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline">{vehicle.category}</Badge>
                    <Badge variant="outline">{vehicle.year}</Badge>
                    <Badge variant="outline">{vehicle.fuel}</Badge>
                  </div>
                  <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-primary">
                    ${vehicle.price.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {vehicle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No vehicles found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search term"
                    : "Get started by adding your first vehicle"}
                </p>
                {!searchTerm && (
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Vehicle
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </DialogTitle>
              <DialogDescription>
                Fill in all vehicle details. Required fields are marked with *.
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
                    placeholder="Vehicle name"
                    required
                  />
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
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                      <SelectItem value="Wagon">Wagon</SelectItem>
                    </SelectContent>
                  </Select>
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
                    placeholder="45000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year *</label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    placeholder="2024"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mileage *</label>
                  <Input
                    value={formData.mileage}
                    onChange={(e) =>
                      setFormData({ ...formData, mileage: e.target.value })
                    }
                    placeholder="New"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fuel Type *</label>
                  <Select
                    value={formData.fuel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, fuel: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gasoline">Gasoline</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Transmission *</label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) =>
                      setFormData({ ...formData, transmission: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Main Image URL *</label>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/vehicle.jpg"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Vehicle description..."
                  rows={3}
                  required
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                  />
                  <Button type="button" variant="outline" onClick={addFeature}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features?.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      {feature}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeFeature(idx)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Specifications</label>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs">Engine</label>
                    <Input
                      value={formData.specs?.engine}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs!, engine: e.target.value },
                        })
                      }
                      placeholder="2.5L 4-Cylinder"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Horsepower</label>
                    <Input
                      type="number"
                      value={formData.specs?.hp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: {
                            ...formData.specs!,
                            hp: parseInt(e.target.value),
                          },
                        })
                      }
                      placeholder="252"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Torque</label>
                    <Input
                      value={formData.specs?.torque}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs!, torque: e.target.value },
                        })
                      }
                      placeholder="232 lb-ft"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Acceleration</label>
                    <Input
                      value={formData.specs?.acceleration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: {
                            ...formData.specs!,
                            acceleration: e.target.value,
                          },
                        })
                      }
                      placeholder="6.2s (0-60)"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Fuel Economy</label>
                    <Input
                      value={formData.specs?.fuelEconomy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: {
                            ...formData.specs!,
                            fuelEconomy: e.target.value,
                          },
                        })
                      }
                      placeholder="42 MPG"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Drivetrain</label>
                    <Input
                      value={formData.specs?.drivetrain}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: {
                            ...formData.specs!,
                            drivetrain: e.target.value,
                          },
                        })
                      }
                      placeholder="FWD"
                    />
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Available Colors</label>
                <div className="flex gap-2">
                  <Input
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder="Add a color"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addColor())
                    }
                  />
                  <Button type="button" variant="outline" onClick={addColor}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.colors?.map((color, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      {color}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeColor(idx)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Gallery Images</label>
                <div className="flex gap-2">
                  <Input
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    placeholder="Add gallery image URL"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addGalleryImage())
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addGalleryImage}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.gallery?.map((img, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      Image {idx + 1}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeGalleryImage(idx)}
                      />
                    </Badge>
                  ))}
                </div>
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
                    checked={formData.isNew}
                    onChange={(e) =>
                      setFormData({ ...formData, isNew: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Mark as New</span>
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
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
