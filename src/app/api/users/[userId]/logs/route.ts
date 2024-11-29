import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where: {
          userId: params.userId,
        },
        include: {
          bean: {
            select: {
              id: true,
              name: true,
              roaster: true,
            },
          },
          method: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          brewDate: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.log.count({
        where: {
          userId: params.userId,
        },
      }),
    ]);

    return NextResponse.json({
      logs,
      total,
      hasMore: skip + logs.length < total,
    });
  } catch (error) {
    console.error("[USER_LOGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
