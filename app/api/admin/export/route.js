import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const prisma = new PrismaClient()

export async function GET() {
  const registrations = await prisma.christmasRegistration.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(registrations)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')
  
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
  
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="christmas_registrations.xlsx"'
    }
  })
}
