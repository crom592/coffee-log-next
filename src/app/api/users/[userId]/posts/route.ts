import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          userId: params.userId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          log: {
            select: {
              id: true,
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
              rating: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.post.count({
        where: {
          userId: params.userId,
        },
      }),
    ]);

    return NextResponse.json({
      posts,
      total,
      hasMore: skip + posts.length < total,
    });
  } catch (error) {
    console.error("[USER_POSTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
