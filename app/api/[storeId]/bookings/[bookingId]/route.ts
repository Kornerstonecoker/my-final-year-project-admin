import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Get a single booking by ID
export async function GET(req: Request, { params }: { params: { bookingId: string } }) {
  try {
    if (!params.bookingId) {
      return new NextResponse("Booking ID is required", { status: 400 });
    }

    const booking = await prismadb.booking.findUnique({
      where: {
        id: params.bookingId,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[BOOKING_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Update a booking by ID
export async function PATCH(req: Request, { params }: { params: { bookingId: string } }) {
  try {
    const body = await req.json();
    const updatedBooking = await prismadb.booking.update({
      where: { id: params.bookingId },
      data: body,
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("[BOOKING_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Delete a booking by ID
export async function DELETE(req: Request, { params }: { params: { bookingId: string } }) {
  try {
    const deletedBooking = await prismadb.booking.delete({
      where: {
        id: params.bookingId,
      },
    });

    return NextResponse.json(deletedBooking);
  } catch (error) {
    console.error("[BOOKING_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
