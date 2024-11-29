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

    const [followers, total] = await Promise.all([
      prisma.follow.findMany({
        where: {
          followingId: params.userId,
        },
        include: {
          follower: {
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
          followingId: params.userId,
        },
      }),
    ]);

    return NextResponse.json({
      followers: followers.map((f) => f.follower),
      total,
      hasMore: skip + followers.length < total,
    });
  } catch (error) {
    console.error("[USER_FOLLOWERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
