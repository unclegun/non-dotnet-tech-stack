import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing items
  await prisma.item.deleteMany();

  // Create sample items
  const items = [
    { name: 'TypeScript Configuration' },
    { name: 'API Route Handler' },
    { name: 'Database Schema' }
  ];

  for (const item of items) {
    await prisma.item.create({ data: item });
    console.log(`  ✓ Created item: ${item.name}`);
  }

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
