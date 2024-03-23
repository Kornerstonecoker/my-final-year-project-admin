import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Create a new booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newBooking = await prismadb.booking.create({
      data: body,
    });
    return NextResponse.json(newBooking);
  } catch (error) {
    console.error("[BOOKING_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Get all bookings
export async function GET(req: Request) {
  try {
    const bookings = await prismadb.booking.findMany();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("[BOOKING_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
