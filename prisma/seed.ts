import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const VENUN = [
      {
        name: 'Lab-207',
        capacity: 70,
      },
      {
        name: 'Lab-205',
        capacity: 60,
      },
      {
        name: 'Lab-203',
        capacity: 70,
      },
      {
        name: 'M23',
        capacity: 70,
      },
      {
        name: 'M24',
        capacity: 70,
      },
      {
        name: 'Project-Base 4',
        capacity: 100,
      },
      {
        name: 'Project-Base 3',
        capacity: 100,
      },
    ]
    for (const venu of VENUN) {
      await prisma.venue.create({
        data: venu
      })
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })