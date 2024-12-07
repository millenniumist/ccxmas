

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient()

const generateShortId = () => {
  return uuidv4().substring(0, 5);
};

export async function POST(request) {
  try {
    const data = await request.json()
    
    const registration = await prisma.christmasRegistration.create({
      data: {
        tId: generateShortId(),
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        phone: data.phone,
        age: parseInt(data.age),
        address: data.address,
        familySize: parseInt(data.familySize),
        dietary: data.dietary,
        notes: data.notes,
        attendance: false
      }
    })
    
    return NextResponse.json(registration)
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}