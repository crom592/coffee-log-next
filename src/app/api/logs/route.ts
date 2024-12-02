import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    logWithTimestamp(`POST /api/logs - Session: ${JSON.stringify(session)}`);
    
    if (!session?.user?.id) {
      logWithTimestamp('Unauthorized - No session or user ID');
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    logWithTimestamp(`Request payload: ${JSON.stringify(data)}`);
    
    if (!data) {
      return NextResponse.json({ message: "Bad Request - Missing data" }, { status: 400 });
    }

    // Clean and validate the data
    const cleanData = {
      user: {
        connect: {
          id: session.user.id
        }
      },
      bean: {
        connect: {
          id: data.beanId
        }
      },
      method: {
        connect: {
          id: data.methodId
        }
      },
      grinderType: data.grinderType || null,
      grindSize: data.grindSize,
      temperature: data.temperature,
      doseIn: data.doseIn,
      doseOut: data.doseOut || null,
      ratio: data.ratio,
      timeSeconds: data.timeSeconds || null,
      tds: data.tds || null,
      extractionYield: data.extractionYield || null,
      waterType: data.waterType || null,
      filterType: data.filterType || null,
      notes: data.notes || '',
      improvements: data.improvements || '',
      rating: data.rating || 0,
      // Bean details
      beanOrigin: data.beanOrigin || null,
      beanRegion: data.beanRegion || null,
      beanFarm: data.beanFarm || null,
      beanAltitude: data.beanAltitude || null,
      beanProcess: data.beanProcess || null,
      beanVariety: data.beanVariety || null,
      beanRoastLevel: data.beanRoastLevel || null,
      beanRoastDate: data.beanRoastDate ? new Date(data.beanRoastDate) : null,
      beanDescription: data.beanDescription || null
    };

    logWithTimestamp(`Cleaned data: ${JSON.stringify(cleanData)}`);

    // Validate required fields
    const requiredFields = {
      beanId: data.beanId,
      methodId: data.methodId,
      grindSize: data.grindSize,
      temperature: data.temperature,
      doseIn: data.doseIn,
      ratio: data.ratio
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => value == null)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      const message = `Missing required fields: ${missingFields.join(', ')}`;
      logWithTimestamp(message);
      return NextResponse.json({ message }, { status: 400 });
    }

    // Create the log
    const log = await prisma.log.create({
      data: cleanData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        bean: true,
        method: true,
      },
    });

    logWithTimestamp(`Log created successfully: ${JSON.stringify(log)}`);
    return NextResponse.json(log);
  } catch (error) {
    errorWithTimestamp(`API Error: ${error instanceof Error ? error.message : String(error)}`);
    
    // Prisma error handling
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json({ 
        message: "A unique constraint would be violated.",
        details: 'meta' in error ? error.meta : undefined
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({ 
      message: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const logs = await prisma.log.findMany({
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
        bean: true,
        method: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    errorWithTimestamp(`API Error: ${error instanceof Error ? error.message : String(error)}`);
    
    // Prisma error handling
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json({ 
        message: "A unique constraint would be violated.",
        details: 'meta' in error ? error.meta : undefined
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({ 
      message: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
