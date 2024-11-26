import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No session found' },
        { status: 401 }
      )
    }

    const coffeeLog = await prisma.coffeeLog.findUnique({
      where: {
        id: params.id,
        OR: [
          { userId: session.user.id },
          { isPublic: true }
        ]
      }
    })

    if (!coffeeLog) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Coffee log not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json(coffeeLog)
  } catch (error) {
    console.error('Error fetching coffee log:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coffee log', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No session found' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    // Check if the log exists and belongs to the user
    const existingLog = await prisma.coffeeLog.findUnique({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingLog) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Coffee log not found or access denied' },
        { status: 404 }
      )
    }

    const updatedLog = await prisma.coffeeLog.update({
      where: {
        id: params.id
      },
      data: {
        originCountry: data.origin.country,
        originRegion: data.origin.region,
        originFarm: data.origin.farm,
        originAltitude: data.origin.altitude,
        processing: data.processing,
        roastPoint: data.roastPoint,
        beanNotes: data.beanNotes,
        waterType: data.waterType,
        dose: data.dose,
        waterAmount: data.waterAmount,
        ratio: data.ratio,
        grinder: data.grinder,
        grindSize: data.grindSize,
        waterTemp: data.waterTemp,
        dripper: data.dripper,
        filter: data.filter,
        recipe: data.recipe,
        brewTime: data.brewTime,
        tds: data.tds,
        extraction: data.extraction,
        cupNotes: data.cupNotes,
        improvements: data.improvements,
        isPublic: data.isPublic,
        allowCollaboration: data.allowCollaboration,
      }
    })

    return NextResponse.json(updatedLog)
  } catch (error) {
    console.error('Error updating coffee log:', error)
    return NextResponse.json(
      { error: 'Failed to update coffee log', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No session found' },
        { status: 401 }
      )
    }

    // Check if the log exists and belongs to the user
    const existingLog = await prisma.coffeeLog.findUnique({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingLog) {
      return NextResponse.json(
        { error: 'Not Found', details: 'Coffee log not found or access denied' },
        { status: 404 }
      )
    }

    await prisma.coffeeLog.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Coffee log deleted successfully' })
  } catch (error) {
    console.error('Error deleting coffee log:', error)
    return NextResponse.json(
      { error: 'Failed to delete coffee log', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
