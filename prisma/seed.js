const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Seed Admin data
  const admins = [
    {
      email: 'admin@cc.com',
      password: 'admin123',
      name: 'Admin One'
    },
  ]

  // Seed Christmas Registration data
  const registrations = [
    {
      tId: 'T001',
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'Johnny',
      phone: '123-456-7890',
      age: 25,
      address: '123 Main St',
      familySize: 1,
      dietary: 'No nuts',
      attendance: false,
      notes: 'Excited to join!'
    },
    {
      tId: 'T002',
      firstName: 'Jane',
      lastName: 'Smith',
      nickName: 'Janie',
      phone: '098-765-4321',
      age: 30,
      address: '456 Oak Ave',
      familySize: 3,
      dietary: 'Vegetarian',
      attendance: false,
      notes: 'Coming with family'
    },
    {
      tId: 'T003',
      firstName: 'Mike',
      lastName: 'Johnson',
      nickName: 'Mikey',
      phone: '555-555-5555',
      age: 28,
      address: '789 Pine Rd',
      familySize: 2,
      dietary: null,
      attendance: false,
      notes: 'Will bring dessert'
    }
  ]

  // Insert Admin data
  for (const admin of admins) {
    await prisma.admin.create({
      data: admin
    })
  }

  // Insert Christmas Registration data
  for (const registration of registrations) {
    await prisma.christmasRegistration.create({
      data: registration
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
