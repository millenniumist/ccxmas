import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const registrations = await prisma.christmasRegistration.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(registrations)
}
