import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const log = await prisma.log.findUnique({
      where: {
        id: params.id,
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
    });

    if (!log) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(log);
  } catch (error) {
    console.error("[LOG_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { beanId, methodId, grindSize, temperature, ratio, time, notes, rating } = body;

    const log = await prisma.log.update({
      where: {
        id: params.id,
      },
      data: {
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
    console.error("[LOG_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const log = await prisma.log.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("[LOG_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
