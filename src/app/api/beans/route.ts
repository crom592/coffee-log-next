import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, roastLevel, origin, description } = body;

    const bean = await prisma.bean.create({
      data: {
        userId: session.user.id,
        name,
        roastLevel,
        origin,
        description,
      },
    });

    return NextResponse.json(bean);
  } catch (error) {
    console.error("[BEANS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const beans = await prisma.bean.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(beans);
  } catch (error) {
    console.error("[BEANS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
