import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET single menu item by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const menuItem = await db.menuItem.findUnique({
      where: { id: params.id },
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu item" },
      { status: 500 },
    );
  }
}

// PUT - Update menu item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    const updateData: any = {
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      popular: body.popular !== undefined ? body.popular : undefined,
      spicy: body.spicy !== undefined ? body.spicy : undefined,
      image: body.image,
    };

    // Remove undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const menuItem = await db.menuItem.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 },
    );
  }
}

// DELETE - Remove menu item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db.menuItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 },
    );
  }
}
