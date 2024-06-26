import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error()     
  }
  
  const body = await request.json();
  const { name, description, price, brand, category, inStock, image } = body;

  console.log('/+++++++++++/',body)
  const user = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images: image,
    },
  });

  return NextResponse.json(user);
}
