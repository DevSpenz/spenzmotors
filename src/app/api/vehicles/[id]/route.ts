import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET single vehicle by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const vehicle = await db.vehicle.findUnique({
      where: { id: params.id },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    // Transform data to match frontend format
    const transformedVehicle = {
      ...vehicle,
      features: vehicle.features ? JSON.parse(vehicle.features) : [],
      gallery: vehicle.gallery ? JSON.parse(vehicle.gallery) : [],
      colors: vehicle.colors ? JSON.parse(vehicle.colors) : [],
      specs: {
        engine: vehicle.specsEngine,
        hp: vehicle.specsHp,
        torque: vehicle.specsTorque,
        acceleration: vehicle.specsAcceleration,
        fuelEconomy: vehicle.specsFuelEconomy,
        transmission: vehicle.specsTransmission,
        drivetrain: vehicle.specsDrivetrain,
        fuelTank: vehicle.specsFuelTank,
        seating: vehicle.specsSeating,
        cargo: vehicle.specsCargo,
      },
    };

    return NextResponse.json(transformedVehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 },
    );
  }
}

// PUT - Update vehicle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    // Transform frontend data to database format
    const updateData: any = {
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
      popular: body.popular !== undefined ? body.popular : undefined,
      isNew: body.isNew !== undefined ? body.isNew : undefined,
    };

    // Remove undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const vehicle = await db.vehicle.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 },
    );
  }
}

// DELETE - Remove vehicle
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db.vehicle.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 },
    );
  }
}
