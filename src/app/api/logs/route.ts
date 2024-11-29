import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { beanId, methodId, grindSize, temperature, ratio, time, notes, rating } = await request.json();

    const log = await prisma.log.create({
      data: {
        user: {
          connect: {
            id: session.user.id
          }
        },
        ...(beanId && {
          bean: {
            connect: {
              id: beanId
            }
          }
        }),
        ...(methodId && {
          method: {
            connect: {
              id: methodId
            }
          }
        }),
        grindSize,
        temperature,
        ratio,
        time,
        notes,
        rating,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        bean: true,
        method: true,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const logs = await prisma.log.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        bean: true,
        method: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
