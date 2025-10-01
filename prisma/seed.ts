import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete old data (optional)
  await prisma.vote.deleteMany();
  await prisma.option.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      passowrd: 'password', // in real apps, hash this!
    },
  });

  // Create a sample poll
  const poll = await prisma.poll.create({
    data: {
      question: 'What is your favorite programming language?',
      options: {
        create: [
          { text: 'JavaScript' },
          { text: 'Python' },
          { text: 'Java' },
          { text: 'C++' },
        ],
      },
    },
    include: { options: true },
  });

  console.log('Seed complete!');
  console.log('Test User:', user);
  console.log('Poll:', poll);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
