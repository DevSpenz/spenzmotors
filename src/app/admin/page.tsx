"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Utensils,
  Plus,
  ArrowRight,
  ArrowUp,
  Users,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProtectedRoute } from "@/components/admin/protected-route";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalMenuItems: 0,
    popularVehicles: 0,
    popularMenuItems: 0,
  });

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const [vehiclesRes, menuRes] = await Promise.all([
          fetch("/api/vehicles"),
          fetch("/api/menu-items"),
        ]);

        const vehicles = await vehiclesRes.json();
        const menuItems = await menuRes.json();

        setStats({
          totalVehicles: vehicles.length || 0,
          totalMenuItems: menuItems.length || 0,
          popularVehicles: Array.isArray(vehicles)
            ? vehicles.filter((v: any) => v.popular).length
            : 0,
          popularMenuItems: Array.isArray(menuItems)
            ? menuItems.filter((m: any) => m.popular).length
            : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />

        {/* Main Content */}
        <div className="container px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Welcome to the Admin Panel
            </h2>
            <p className="text-muted-foreground text-lg">
              Manage your vehicle inventory and restaurant menu from one central
              location
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Vehicles
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVehicles}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active inventory
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Menu Items
                </CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMenuItems}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Available dishes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Popular Vehicles
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.popularVehicles}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Featured items
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Popular Menu Items
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.popularMenuItems}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Customer favorites
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link href="/admin/vehicles">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-lg">Manage Vehicles</CardTitle>
                  <CardDescription>
                    Add, edit, or remove vehicles from your inventory. Update
                    specifications, pricing, and images.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Plus className="h-4 w-4" />
                    Add new vehicle
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link href="/admin/menu">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-lg">Manage Menu</CardTitle>
                  <CardDescription>
                    Update your restaurant menu items, prices, descriptions, and
                    categories. Mark popular items.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Plus className="h-4 w-4" />
                    Add new menu item
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      Vehicle Management
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Click "Manage Vehicles" to view your inventory</li>
                      <li>Click "Add Vehicle" to create a new listing</li>
                      <li>
                        Fill in all vehicle details including specs and images
                      </li>
                      <li>Mark vehicles as "Popular" or "New" as needed</li>
                      <li>Edit or delete vehicles anytime</li>
                    </ol>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      Menu Management
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Click "Manage Menu" to view menu items</li>
                      <li>Click "Add Menu Item" to create a new dish</li>
                      <li>Enter name, description, price, and category</li>
                      <li>Mark items as "Popular" or "Spicy" as needed</li>
                      <li>Update prices and descriptions anytime</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
