import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const [following, total] = await Promise.all([
      prisma.follow.findMany({
        where: {
          followerId: params.userId,
        },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              image: true,
              _count: {
                select: {
                  followers: true,
                  following: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.follow.count({
        where: {
          followerId: params.userId,
        },
      }),
    ]);

    return NextResponse.json({
      following: following.map((f) => f.following),
      total,
      hasMore: skip + following.length < total,
    });
  } catch (error) {
    console.error("[USER_FOLLOWING_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
