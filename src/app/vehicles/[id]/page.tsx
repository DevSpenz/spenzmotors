"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  Shield,
  CheckCircle,
  Phone,
  Calendar,
  Heart,
  Share2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [favorite, setFavorite] = useState(false);

  /* ---------------- Fetch Vehicle ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        if (!res.ok) {
          toast.error("Vehicle not found");
          return;
        }
        const data = await res.json();
        setVehicle(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load vehicle");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  /* ----------- Set default color safely ----------- */
  useEffect(() => {
    if (vehicle?.colors?.length && !selectedColor) {
      setSelectedColor(vehicle.colors[0]);
    }
  }, [vehicle, selectedColor]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
    toast(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard");
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    );
  }

  /* ---------------- Not Found ---------------- */
  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Car className="h-14 w-14 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Vehicle Not Found</h1>
        <Link href="/vehicles">
          <Button>Back to Vehicles</Button>
        </Link>
      </div>
    );
  }

  /* ---------------- Page ---------------- */
  return (
    <div className="min-h-screen flex flex-col p-4 w-full max-w-7xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="w-full flex h-16 items-center justify-between">
          <Link href="/vehicles">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="font-bold">{vehicle.name}</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container py-8 grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
            {vehicle.isNew && (
              <Badge className="absolute top-4 left-4">
                New {vehicle.year}
              </Badge>
            )}
          </div>

          {vehicle.gallery?.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {vehicle.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary">{vehicle.category}</Badge>
            <h1 className="text-3xl font-bold mt-2">{vehicle.name}</h1>
            <p className="text-muted-foreground">{vehicle.description}</p>
          </div>

          <div className="text-3xl font-bold text-primary">
            {formatPrice(vehicle.price)}
          </div>

          {/* Specs */}
          <Card>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <Spec icon={Gauge} label={`${vehicle.specs.hp} HP`} />
              <Spec icon={Fuel} label={vehicle.specs.fuelEconomy} />
              <Spec icon={Shield} label={vehicle.specs.acceleration} />
              <Spec icon={Car} label={`${vehicle.specs.seating} Seats`} />
            </CardContent>
          </Card>

          {/* Colors */}
          {vehicle.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.colors.map((color) => (
                  <Button
                    key={color}
                    size="sm"
                    variant={color === selectedColor ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button variant="outline" onClick={handleFavorite}>
              <Heart
                className={`h-5 w-5 ${
                  favorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Tabs */}
      <section className="bg-muted/30 py-8">
        <div className="container">
          <Tabs defaultValue="features">
            <TabsList>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card>
                <CardContent className="grid md:grid-cols-2 gap-4 pt-6">
                  {vehicle.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {f}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

/* -------- Small helper component -------- */
function Spec({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-5 w-5 text-primary mb-1" />
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}
