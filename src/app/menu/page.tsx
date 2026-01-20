"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  ChefHat,
  Coffee,
  Pizza,
  Wine,
  Fish,
  Beef,
  Loader2,
} from "lucide-react";
import Link from "next/link";

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

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const menuCategories = [
    { id: "all", name: "All Items", icon: <ChefHat className="h-4 w-4" /> },
    {
      id: "Appetizers",
      name: "Appetizers",
      icon: <Pizza className="h-4 w-4" />,
    },
    { id: "Salads", name: "Salads", icon: <Coffee className="h-4 w-4" /> },
    { id: "Mains", name: "Main Courses", icon: <Beef className="h-4 w-4" /> },
    { id: "Seafood", name: "Seafood", icon: <Fish className="h-4 w-4" /> },
    { id: "Desserts", name: "Desserts", icon: <Wine className="h-4 w-4" /> },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">
              Spenza Restaurant
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Experience culinary excellence with our carefully crafted dishes,
            prepared with finest ingredients and served with passion
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="h-16 w-16 animate-spin text-muted-foreground mx-auto mb-4" />
              <p className="text-lg">Loading menu...</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <div className="mb-8">
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="w-full"
                >
                  <TabsList className="w-full justify-start h-auto flex-wrap gap-2">
                    {menuCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="gap-2"
                      >
                        {category.icon}
                        <span className="hidden sm:inline">
                          {category.name}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Menu Items Grid */}
              <div className="space-y-6">
                {menuCategories
                  .filter(
                    (cat) =>
                      selectedCategory === "all" || cat.id === selectedCategory,
                  )
                  .map((category) => {
                    const categoryItems =
                      selectedCategory === "all"
                        ? menuItems.filter(
                            (item) => item.category === category.id,
                          )
                        : filteredItems;

                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={category.id}>
                        <div className="flex items-center gap-3 mb-6">
                          {category.icon}
                          <h2 className="text-2xl md:text-3xl font-bold">
                            {category.name}
                            <span className="text-muted-foreground font-normal text-lg ml-2">
                              ({categoryItems.length} items)
                            </span>
                          </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {categoryItems.map((item) => (
                            <Card
                              key={item.id}
                              className="hover:shadow-lg transition-all duration-300"
                            >
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-lg">
                                        {item.name}
                                      </h3>
                                      {item.popular && (
                                        <Badge
                                          variant="secondary"
                                          className="flex items-center gap-1"
                                        >
                                          <Star className="h-3 w-3 fill-current" />
                                          Popular
                                        </Badge>
                                      )}
                                      {item.spicy && (
                                        <Badge
                                          variant="destructive"
                                          className="flex items-center gap-1"
                                        >
                                          🌶️ Spicy
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-2">
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="text-right ml-4">
                                    <div className="text-xl font-bold text-primary">
                                      ${item.price}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Menu Info */}
              <Card className="mt-12 bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Menu Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Dietary Options</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Vegetarian options available</li>
                        <li>• Gluten-free menu on request</li>
                        <li>• Vegan dishes marked (V)</li>
                        <li>• Allergen-friendly substitutions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Special Requests</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Custom spice levels</li>
                        <li>• Ingredient substitutions</li>
                        <li>• Portion adjustments</li>
                        <li>• Birthday/celebration plates</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Freshness Guarantee
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Locally sourced ingredients</li>
                        <li>• Made-to-order preparation</li>
                        <li>• Seasonal menu updates</li>
                        <li>• Chef's daily specials</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Dine With Us?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Make a reservation today and experience our exceptional
                  cuisine in a sophisticated atmosphere
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/reservation">
                    <Button size="lg" className="px-8">
                      Make a Reservation
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="px-8">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
