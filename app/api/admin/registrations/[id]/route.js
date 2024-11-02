import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(request, { params }) {
  const { id } = params
  const data = await request.json()

  try {
    const updatedRegistration = await prisma.christmasRegistration.update({
      where: { id: parseInt(id) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        phone: data.phone,
        familySize: data.familySize,
        attendance: data.attendance,
      },
    })

    return NextResponse.json(updatedRegistration)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
