import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const data = await request.json()
    const registration = await prisma.christmasRegistration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        phone: data.phone,
        age: parseInt(data.age),
        address: data.address,
        familySize: parseInt(data.familySize),
        dietary: data.dietary,
        notes: data.notes
      }
    })
    
    return NextResponse.json(registration)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
