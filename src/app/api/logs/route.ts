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
    const { beanId, methodId, grindSize, temperature, ratio, time, notes, rating } = body;

    const log = await prisma.log.create({
      data: {
        userId: session.user.id,
        beanId,
        methodId,
        grindSize,
        temperature,
        ratio,
        time,
        notes,
        rating,
      },
      include: {
        bean: true,
        method: true,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("[LOGS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const logs = await prisma.log.findMany({
      where: {
        userId: userId || session.user.id,
      },
      include: {
        bean: true,
        method: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("[LOGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
