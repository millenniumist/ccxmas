import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, password } = await request.json()

  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  if (admin.password === password) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
