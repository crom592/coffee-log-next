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

    const { name, roastLevel, origin, description } = await request.json();

    const bean = await prisma.bean.create({
      data: {
        user: {
          connect: {
            id: session.user.id
          }
        },
        name,
        roastLevel,
        origin,
        description,
      },
    });

    return NextResponse.json(bean);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
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
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(beans);
  } catch (error) {
    console.error("[BEANS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
