// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

// import prismadb from "@/lib/prismadb";

// export async function POST(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const body = await req.json();
//     const {
//       from,
//       to,
//       productId
//     } = body;

//     console.log("GOT BODY: " + JSON.stringify(body))

//     if(!from) {
//       return new NextResponse("Missing parameter 'from'")
//     }
//     if(!from) {
//       return new NextResponse("Missing parameter 'to'")
//     }
//     console.log("before db request")
//     const period = await prismadb.period.create({
//       data: {
//         from: from,
//         to: to,
//         productId: productId
//       }
//     }
//     )
//     console.log("after db request")
//     console.log(JSON.stringify(period))
//     return NextResponse.json(period);
//   } catch (error) {
//     console.log("[RENTAL_POST]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const {searchParams} = new URL(req.url);
//     const categoryId = searchParams.get("categoryId") || undefined
//     const colorId = searchParams.get("colorId") || undefined
//     const sizeId = searchParams.get("sizeId") || undefined
//     const isFeatured = searchParams.get("isFeatured") 

//     if (!params.storeId) {
//       return new NextResponse("Store ID is required", { status: 400 });
//     }


//     const products = await prismadb.product.findMany({
//       where: {
//         categoryId,
//         colorId,
//         sizeId,
//         isFeatured: isFeatured ? true : undefined,
//         isArchive: false,
//         storeId: params.storeId,
//       },
//       include:{
//         images:true,
//         category:true,
//         color:true,
//         size:true
//       },
//       orderBy:{
//         createdAt: 'desc'
//       }
//     });
//     return NextResponse.json(products);
//   } catch (error) {
//     console.log("[PRODUCTS_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
