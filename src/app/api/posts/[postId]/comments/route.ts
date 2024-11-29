import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content } = await request.json();

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { userId: true },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        user: {
          connect: {
            id: session.user.id
          }
        },
        post: {
          connect: {
            id: params.postId
          }
        },
        content,
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

    // Create notification if the comment is not on the user's own post
    if (post.userId !== session.user.id) {
      await createNotification({
        type: "COMMENT",
        userId: post.userId,
        actorId: session.user.id,
        postId: params.postId,
      });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          postId: params.postId,
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
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.comment.count({
        where: {
          postId: params.postId,
        },
      }),
    ]);

    return NextResponse.json({
      comments,
      total,
      hasMore: skip + comments.length < total,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
