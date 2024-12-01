import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    if (!data.name || !data.roastLevel) {
      return NextResponse.json({ message: "Name and roast level are required" }, { status: 400 });
    }

    const bean = await prisma.bean.create({
      data: {
        name: data.name,
        roastLevel: data.roastLevel,
        origin: data.origin || null,
        description: data.description || null,
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    });

    return NextResponse.json(bean);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const beans = await prisma.bean.findMany({
      where: {
        userId: session.user.id
      }
    });

    return NextResponse.json(beans);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}
