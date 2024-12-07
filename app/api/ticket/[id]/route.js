import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  const { id } = await params

  try {
    const ticket = await prisma.christmasRegistration.findFirst({
      where: { tId: id }
    })

    return NextResponse.json(ticket)
  } catch (error) {
    // console.log('Registration error:', error)

    return NextResponse.json({ error: 'Failed to get registration' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
