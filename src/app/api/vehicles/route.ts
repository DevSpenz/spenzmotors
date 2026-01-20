import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all vehicles
export async function GET() {
  try {
    const vehicles = await db.vehicle.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data to match frontend format
    const transformedVehicles = vehicles.map((v) => ({
      ...v,
      features: v.features ? JSON.parse(v.features) : [],
      gallery: v.gallery ? JSON.parse(v.gallery) : [],
      colors: v.colors ? JSON.parse(v.colors) : [],
      specs: {
        engine: v.specsEngine,
        hp: v.specsHp,
        torque: v.specsTorque,
        acceleration: v.specsAcceleration,
        fuelEconomy: v.specsFuelEconomy,
        transmission: v.specsTransmission,
        drivetrain: v.specsDrivetrain,
        fuelTank: v.specsFuelTank,
        seating: v.specsSeating,
        cargo: v.specsCargo,
      },
    }));

    return NextResponse.json(transformedVehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 },
    );
  }
}

// POST - Create new vehicle
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Transform frontend data to database format
    const vehicleData = {
      name: body.name,
      category: body.category,
      price: body.price,
      year: body.year,
      mileage: body.mileage,
      fuel: body.fuel,
      transmission: body.transmission,
      image: body.image,
      features: JSON.stringify(body.features || []),
      specsEngine: body.specs?.engine,
      specsHp: body.specs?.hp,
      specsTorque: body.specs?.torque,
      specsAcceleration: body.specs?.acceleration,
      specsFuelEconomy: body.specs?.fuelEconomy,
      specsTransmission: body.specs?.transmission,
      specsDrivetrain: body.specs?.drivetrain,
      specsFuelTank: body.specs?.fuelTank,
      specsSeating: body.specs?.seating,
      specsCargo: body.specs?.cargo,
      colors: JSON.stringify(body.colors || []),
      description: body.description,
      gallery: body.gallery ? JSON.stringify(body.gallery) : null,
      popular: body.popular || false,
      isNew: body.isNew || false,
    };

    const vehicle = await db.vehicle.create({
      data: vehicleData,
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 },
    );
  }
}
