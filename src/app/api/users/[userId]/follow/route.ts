import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.id === params.userId) {
      return new NextResponse("Cannot follow yourself", { status: 400 });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: params.userId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
      return new NextResponse(null, { status: 204 });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId: params.userId,
      },
    });

    // Create notification
    await createNotification({
      type: "FOLLOW",
      userId: params.userId,
      actorId: session.user.id,
    });

    return NextResponse.json(follow);
  } catch (error) {
    console.error("[FOLLOW_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: params.userId,
        },
      },
    });

    return NextResponse.json({ following: !!follow });
  } catch (error) {
    console.error("[FOLLOW_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
