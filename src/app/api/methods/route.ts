import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, description } = body;

    const method = await prisma.brewMethod.create({
      data: {
        userId: session.user.id,
        name,
        description,
      },
    });

    return NextResponse.json(method);
  } catch (error) {
    console.error("[METHODS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const methods = await prisma.brewMethod.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(methods);
  } catch (error) {
    console.error("[METHODS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
