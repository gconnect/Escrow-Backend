import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  // const user1 = await prisma.milestone.upsert({
  //   where: { id: 1 },
  //   update: {
  //     id: 1
  //   },
  //   create: {
  //     id: 1,
  //     description: "hello",
  //     percent: 10
  //   },
  // });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
