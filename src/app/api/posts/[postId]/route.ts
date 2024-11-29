import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
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
          include: {
            bean: true,
            method: true,
          },
        },
        comments: {
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
        },
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[POST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (post.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json();
    const { title, content } = body;

    const updatedPost = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
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
        log: {
          include: {
            bean: true,
            method: true,
          },
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("[POST_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (post.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[POST_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
