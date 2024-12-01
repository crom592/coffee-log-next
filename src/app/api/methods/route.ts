import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      logWithTimestamp('Unauthorized - No session or user ID');
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    if (!data.name) {
      logWithTimestamp('Bad Request - Missing required fields');
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const { name, description } = data;

    const method = await prisma.brewMethod.create({
      data: {
        user: {
          connect: {
            id: session.user.id
          }
        },
        name,
        description: description || null,
      },
    });

    return NextResponse.json(method);
  } catch (error) {
    errorWithTimestamp('API Error: ' + error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      logWithTimestamp('Unauthorized - No session or user ID');
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const methods = await prisma.brewMethod.findMany({
      where: {
        userId: session.user.id
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

    return NextResponse.json(methods);
  } catch (error) {
    errorWithTimestamp('API Error: ' + error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}
