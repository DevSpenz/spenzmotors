"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Mock vehicle data - in production this would come from an API
const vehicleDatabase: { [key: number]: any } = {
  1: {
    id: 1,
    name: "Spenza Executive Sedan",
    category: "Sedan",
    price: 45000,
    year: 2024,
    mileage: "New",
    fuel: "Hybrid",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    ],
    features: [
      "Premium Leather",
      "Advanced Safety",
      "Panoramic Roof",
      "Wireless Charging",
      "Heated Seats",
      "Ventilated Front Seats",
      "Heated Rear Seats",
      "Memory Seats",
      "Premium Audio System",
      "Navigation",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
    ],
    specs: {
      engine: "2.5L 4-Cylinder Hybrid",
      hp: 252,
      torque: "232 lb-ft",
      acceleration: "6.2s (0-60)",
      fuelEconomy: "42 MPG",
      transmission: "8-Speed Automatic",
      drivetrain: "FWD",
      fuelTank: "13.2 gal",
      seating: 5,
      cargo: "16.1 cu ft",
    },
    colors: [
      "Midnight Black",
      "Pearl White",
      "Silver Mist",
      "Deep Blue",
      "Crimson Red",
    ],
    dimensions: {
      length: "195.9 in",
      width: "72.8 in",
      height: "56.9 in",
      wheelbase: "112.2 in",
      weight: "3,638 lbs",
    },
    warranty: {
      basic: "3 years / 36,000 miles",
      powertrain: "5 years / 60,000 miles",
      hybrid: "8 years / 100,000 miles",
    },
    description:
      "The Spenza Executive Sedan represents the pinnacle of luxury and efficiency. Combining a sophisticated hybrid powertrain with premium materials and cutting-edge technology, this sedan delivers an exceptional driving experience.",
    popular: true,
    new: true,
  },
  2: {
    id: 2,
    name: "Spenza Luxury SUV",
    category: "SUV",
    price: 52000,
    year: 2024,
    mileage: "New",
    fuel: "Hybrid",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    ],
    features: [
      "7-Seat Config",
      "AWD System",
      "Captains Chairs",
      "Premium Audio",
      "360° Camera",
      "Power Liftgate",
      "Third-Row Seating",
      "Heated Seats",
      "Ventilated Front Seats",
      "Remote Start",
    ],
    specs: {
      engine: "3.5L V6 Hybrid",
      hp: 295,
      torque: "267 lb-ft",
      acceleration: "6.8s (0-60)",
      fuelEconomy: "38 MPG",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      fuelTank: "17.9 gal",
      seating: 7,
      cargo: "18.3 cu ft",
    },
    colors: [
      "Onyx Black",
      "Diamond White",
      "Sterling Silver",
      "Midnight Blue",
      "Forest Green",
    ],
    dimensions: {
      length: "203.7 in",
      width: "78.3 in",
      height: "68.3 in",
      wheelbase: "120.9 in",
      weight: "4,567 lbs",
    },
    warranty: {
      basic: "3 years / 36,000 miles",
      powertrain: "5 years / 60,000 miles",
      hybrid: "8 years / 100,000 miles",
    },
    description:
      "The Spenza Luxury SUV offers unparalleled versatility and comfort. With available 7-passenger seating, advanced AWD system, and premium materials throughout, it's the perfect vehicle for families who demand luxury.",
    popular: true,
    new: true,
  },
  3: {
    id: 3,
    name: "Spenza GT Sport",
    category: "Sports",
    price: 65000,
    year: 2024,
    mileage: "New",
    fuel: "Gasoline",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    ],
    features: [
      "V8 Engine",
      "Track Mode",
      "Carbon Fiber",
      "Performance Package",
      "Sport Exhaust",
      "Adaptive Suspension",
      "Brembo Brakes",
      "Carbon Fiber Interior",
      "Race Seats",
      "Launch Control",
    ],
    specs: {
      engine: "5.0L V8",
      hp: 450,
      torque: "410 lb-ft",
      acceleration: "4.2s (0-60)",
      fuelEconomy: "22 MPG",
      transmission: "8-Speed Automatic with Paddle Shifters",
      drivetrain: "RWD",
      fuelTank: "16.0 gal",
      seating: 2,
      cargo: "11.6 cu ft",
    },
    colors: [
      "Racing Red",
      "Midnight Black",
      "Titanium Silver",
      "British Racing Green",
      "Solar Orange",
    ],
    dimensions: {
      length: "177.2 in",
      width: "76.0 in",
      height: "52.6 in",
      wheelbase: "103.3 in",
      weight: "3,627 lbs",
    },
    warranty: {
      basic: "3 years / 36,000 miles",
      powertrain: "5 years / 60,000 miles",
    },
    description:
      "The Spenza GT Sport is a pure performance machine. With its powerful V8 engine, track-tuned suspension, and aggressive styling, this sports car delivers exhilarating performance on the street and track.",
    popular: true,
    new: true,
  },
  4: {
    id: 4,
    name: "Spenza Heavy Duty Truck",
    category: "Truck",
    price: 48000,
    year: 2024,
    mileage: "New",
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    ],
    features: [
      "Towing Package",
      "Heavy Duty",
      "4x4 System",
      "Bed Liner",
      "Trailer Brake",
      "Off-Road Package",
      "Tow Hooks",
      "Spray-In Bedliner",
      "Cargo Management System",
      "Heavy Duty Cooling",
    ],
    specs: {
      engine: "6.7L Turbo Diesel",
      hp: 400,
      torque: "800 lb-ft",
      acceleration: "7.5s (0-60)",
      fuelEconomy: "18 MPG",
      transmission: "10-Speed Heavy Duty Automatic",
      drivetrain: "4WD",
      fuelTank: "34.0 gal",
      seating: 6,
      cargo: "77.4 cu ft",
    },
    colors: [
      "Oxford White",
      "Ingot Silver",
      "Velocity Blue",
      "Agate Black",
      "Carbonized Gray",
    ],
    dimensions: {
      length: "250.0 in",
      width: "80.0 in",
      height: "81.3 in",
      wheelbase: "156.8 in",
      weight: "6,800 lbs",
    },
    warranty: {
      basic: "3 years / 36,000 miles",
      powertrain: "5 years / 60,000 miles",
      diesel: "5 years / 100,000 miles",
    },
    description:
      "The Spenza Heavy Duty Truck is built for work and play. With best-in-class towing capacity, a robust diesel engine, and available 4x4 system, this truck can handle any job you throw at it.",
    popular: false,
    new: true,
  },
};

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedColor, setSelectedColor] = useState("");
  const [favorite, setFavorite] = useState(false);

  const vehicleId = parseInt(params.id);
  const vehicle = vehicleDatabase[vehicleId] || vehicleDatabase[1];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    toast(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard!");
  };

  const handleContact = () => {
    toast("Thank you for your interest! Our team will contact you shortly.");
  };

  const handleTestDrive = () => {
    toast("Test drive request submitted! We'll contact you to schedule.");
  };

  if (!selectedColor && vehicle.colors) {
    setSelectedColor(vehicle.colors[0]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/vehicles">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Vehicles
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">
              {vehicle.name}
            </span>
          </div>
        </div>
      </header>

      {/* Vehicle Hero */}
      <section className="py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                {vehicle.new && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-lg px-4 py-2">
                    New {vehicle.year}
                  </Badge>
                )}
              </div>
              {vehicle.gallery && (
                <div className="grid grid-cols-3 gap-2">
                  {vehicle.gallery.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${vehicle.name} view ${idx + 1}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {vehicle.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {vehicle.name}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {vehicle.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(vehicle.price)}
                </div>
                <Badge variant="outline">{vehicle.mileage}</Badge>
                <Badge variant="outline">{vehicle.transmission}</Badge>
              </div>

              {/* Quick Specs */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Gauge className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-semibold">
                        {vehicle.specs.hp} HP
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Horsepower
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Fuel className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-semibold">
                        {vehicle.specs.fuelEconomy}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Fuel Economy
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-semibold">
                        {vehicle.specs.acceleration}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        0-60 MPH
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Car className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-semibold">
                        {vehicle.specs.seating}
                      </div>
                      <div className="text-xs text-muted-foreground">Seats</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Selection */}
              {vehicle.colors && (
                <div>
                  <h3 className="font-semibold mb-3">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.colors.map((color: string) => (
                      <Button
                        key={color}
                        variant={
                          selectedColor === color ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className="flex-1"
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleContact} className="flex-1">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleTestDrive}
                  className="flex-1"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Test Drive
                </Button>
                <Button size="lg" variant="ghost" onClick={handleFavorite}>
                  <Heart
                    className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button size="lg" variant="ghost" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tabs */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicle.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Engine</span>
                        <span className="font-medium">
                          {vehicle.specs.engine}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Horsepower
                        </span>
                        <span className="font-medium">
                          {vehicle.specs.hp} HP
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Torque</span>
                        <span className="font-medium">
                          {vehicle.specs.torque}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Transmission
                        </span>
                        <span className="font-medium">
                          {vehicle.specs.transmission}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Drivetrain
                        </span>
                        <span className="font-medium">
                          {vehicle.specs.drivetrain}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">
                          Fuel Economy
                        </span>
                        <span className="font-medium">
                          {vehicle.specs.fuelEconomy}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Fuel Tank</span>
                        <span className="font-medium">
                          {vehicle.specs.fuelTank}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Seating</span>
                        <span className="font-medium">
                          {vehicle.specs.seating} Passengers
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dimensions">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Dimensions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Length</span>
                        <span className="font-medium">
                          {vehicle.dimensions.length}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Width</span>
                        <span className="font-medium">
                          {vehicle.dimensions.width}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Height</span>
                        <span className="font-medium">
                          {vehicle.dimensions.height}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Wheelbase</span>
                        <span className="font-medium">
                          {vehicle.dimensions.wheelbase}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warranty">
              <Card>
                <CardHeader>
                  <CardTitle>Coverage Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(vehicle.warranty).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b pb-3"
                      >
                        <span className="text-muted-foreground capitalize">
                          {key}
                        </span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in this Vehicle?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact our team today to learn more about the {vehicle.name} or
            schedule a test drive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleContact}>
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" onClick={handleTestDrive}>
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Test Drive
            </Button>
            <Link href="/">
              <Button size="lg" variant="ghost">
                Browse More Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
