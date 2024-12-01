import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

function getPostId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  return segments[segments.length - 2] || ''; // Get postId from /api/posts/[postId]/comments
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const postId = getPostId(request);
    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }
    const body = await request.json();

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        userId: session.user.id,
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Create notification
    if (post.userId !== session.user.id) {
      await createNotification({
        userId: post.userId,
        type: "COMMENT",
        actorId: session.user.id,
        postId,
      });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("[COMMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const postId = getPostId(request);
    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          postId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
        take: limit,
        skip,
      }),
      prisma.comment.count({
        where: {
          postId,
        },
      }),
    ]);

    return NextResponse.json({
      comments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[COMMENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
