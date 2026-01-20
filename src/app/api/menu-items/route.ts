import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all menu items
export async function GET() {
  try {
    const menuItems = await db.menuItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 },
    );
  }
}

// POST - Create new menu item
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const menuItem = await db.menuItem.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        popular: body.popular || false,
        spicy: body.spicy || false,
        image: body.image || null,
      },
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 },
    );
  }
}
