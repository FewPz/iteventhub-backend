import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const EVENT_CATEGORY = [
        "Art & Design",
        "Beauty",
        "Book",
        "Business",
        "Charity",
        "Comedy",
        "Concert",
        "E-Sport",
        "Education",
        "Experience",
        "Fan Meeting",
        "Fashion",
        "Finance & Accounting",
        "Food & Drink",
        "Game",
        "Health & Wellness",
        "Hobby",
        "Party",
        "Run",
        "Sales & Marketing",
        "Technology",
        "Vehicle",
    ];
    for (const category of EVENT_CATEGORY) {
        await prisma.enumCategory.create({
            data: {
                name: category,
            },
        });
        console.log("Category created:", category);
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