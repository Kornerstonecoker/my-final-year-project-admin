import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

/**
 * <summary>
 * This TypeScript function handles POST requests to create a new billboard entry associated with a
 * specific store ID after performing authentication and input validation checks.
 * </summary>
 * <param name="req">The `req` parameter in the code snippet represents the incoming request object in
 * the POST function. It is used to access and handle the data sent in the request, such as the request
 * body (using `req.json()`), headers, and other request details. The `req` object is typically
 * provided</param>
 * <param name="">The code you provided is a TypeScript function for handling a POST request. Here is
 * an explanation of the parameters used in the function:</param>
 * <returns>
 * The code is returning a JSON response with the created billboard data if the request is successful.
 * If there are any validation errors or authorization issues, appropriate error messages with
 * corresponding HTTP status codes are returned. In case of any internal server error, a generic
 * "Internal error" message with a status code of 500 is returned.
 * </returns>
 */
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is Required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if(!storeByUserId){
      return new NextResponse("Unauthorised", {status: 403})
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }


    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      }
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
