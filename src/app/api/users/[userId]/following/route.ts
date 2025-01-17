import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getUserId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  return segments[segments.length - 2] || ''; // Get userId from /api/users/[userId]/following
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = getUserId(request);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const [following, total] = await Promise.all([
      prisma.follow.findMany({
        where: {
          followerId: userId,
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
          followerId: userId,
        },
      }),
    ]);

    return NextResponse.json({
      following: following.map((f) => ({
        ...f.following,
        followedAt: f.createdAt,
      })),
      total,
      hasMore: skip + following.length < total,
    });
  } catch (error) {
    console.error("[FOLLOWING_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
