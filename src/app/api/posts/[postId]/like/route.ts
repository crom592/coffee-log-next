import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id as string,
          postId: params.postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { userId: true },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id as string,
          postId: params.postId,
        },
      },
    });

    if (like) {
      return new NextResponse("Already liked", { status: 400 });
    }

    await prisma.like.create({
      data: {
        user: {
          connect: {
            id: session.user.id as string
          }
        },
        post: {
          connect: {
            id: params.postId
          }
        }
      },
    });

    if (post.userId !== session.user.id) {
      await prisma.notification.create({
        data: {
          type: "LIKE",
          userId: post.userId,
          actorId: session.user.id as string,
          postId: params.postId,
        }
      });
    }

    return NextResponse.json({ liked: true });
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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id as string,
          postId: params.postId,
        },
      },
    });

    return NextResponse.json({
      liked: !!like,
      count: await prisma.like.count({
        where: {
          postId: params.postId,
        },
      }),
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
