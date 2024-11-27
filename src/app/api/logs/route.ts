import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.error('Authentication error: No valid session found')
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No session found' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    // Validate required fields
    if (!data.origin || !data.origin.country) {
      return NextResponse.json(
        { error: 'Validation Error', details: 'Origin country is required' },
        { status: 400 }
      )
    }

    const coffeeLog = await prisma.coffeeLog.create({
      data: {
        userId: session.user.id,
        roastName: data.roastName || '',
        origin: data.origin.country,
        roastLevel: data.roastLevel || '',
        brewMethod: data.brewMethod || '',
        tastingNotes: data.tastingNotes || '',
        rating: data.rating || 0,
        isPublic: data.isPublic || false
      }
    })

    return NextResponse.json(coffeeLog)
  } catch (error) {
    console.error('Error creating coffee log:', error)
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}
