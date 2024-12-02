import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getLogId(request: NextRequest): string {
  return request.nextUrl.pathname.split('/').pop() || '';
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = getLogId(request);
    const log = await prisma.log.findUnique({
      where: {
        id,
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

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = getLogId(request);
    const body = await request.json();
    const { beanId, methodId, grindSize, temperature, ratio, time, notes, rating } = body;

    const log = await prisma.log.update({
      where: {
        id,
      },
      data: {
        beanId,
        methodId,
        grindSize,
        temperature,
        ratio,
        timeSeconds: time,
        notes,
        rating,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("[LOG_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = getLogId(request);
    await prisma.log.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[LOG_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
