import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getUserId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  return segments[segments.length - 2] || ''; // Get userId from /api/users/[userId]/followers
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = getUserId(request);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const [followers, total] = await Promise.all([
      prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip,
      }),
      prisma.follow.count({
        where: {
          followingId: userId,
        },
      }),
    ]);

    return NextResponse.json({
      followers: followers.map((follow) => follow.follower),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[FOLLOWERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
