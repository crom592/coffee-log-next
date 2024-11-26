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
        // 원두 정보
        originCountry: data.origin.country,
        originRegion: data.origin.region || '',
        originFarm: data.origin.farm || '',
        originAltitude: data.origin.altitude || '',
        processing: data.processing || '',
        roastPoint: data.roastPoint || '',
        beanNotes: data.beanNotes || '',

        // 추출 정보
        waterType: data.waterType || '',
        dose: data.dose || '',
        waterAmount: data.waterAmount || '',
        ratio: data.ratio || '',
        grinder: data.grinder || '',
        grindSize: data.grindSize || '',
        waterTemp: data.waterTemp || '',
        dripper: data.dripper || '',
        filter: data.filter || '',
        recipe: data.recipe || '',
        brewTime: data.brewTime || '',
        tds: data.tds || '',
        extraction: data.extraction || '',
        cupNotes: data.cupNotes || '',
        improvements: data.improvements || '',

        // 공유 설정
        isPublic: data.isPublic || false,
        allowCollaboration: data.allowCollaboration || false,
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
