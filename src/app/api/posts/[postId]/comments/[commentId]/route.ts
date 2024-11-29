import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: params.commentId,
      },
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    if (comment.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json();
    const { content } = body;

    const updatedComment = await prisma.comment.update({
      where: {
        id: params.commentId,
      },
      data: {
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

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("[COMMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: params.commentId,
      },
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    if (comment.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.comment.delete({
      where: {
        id: params.commentId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[COMMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
