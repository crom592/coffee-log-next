import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where: {
          userId: params.userId,
        },
        include: {
          post: {
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
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.bookmark.count({
        where: {
          userId: params.userId,
        },
      }),
    ]);

    return NextResponse.json({
      posts: bookmarks.map((b) => b.post),
      total,
      hasMore: skip + bookmarks.length < total,
    });
  } catch (error) {
    console.error("[USER_BOOKMARKS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
