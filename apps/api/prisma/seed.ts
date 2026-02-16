import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.item.deleteMany();
  await prisma.note.deleteMany();
  await prisma.heartbeat.deleteMany();

  // Create sample items
  const items = [
    { name: 'TypeScript Configuration' },
    { name: 'API Route Handler' },
    { name: 'Database Schema' },
    { name: 'Middleware Pipeline' },
  ];

  for (const item of items) {
    await prisma.item.create({ data: item });
    console.log(`  ✓ Created item: ${item.name}`);
  }

  // Create sample notes
  const notes = [
    { content: 'Remember to validate all inputs using Zod schemas' },
    { content: 'Always use structured logging with request IDs for traceability' },
    { content: 'Keep service layer pure: no direct HTTP request/response handling' },
  ];

  for (const note of notes) {
    await prisma.note.create({ data: note });
    console.log(`  ✓ Created note: ${note.content.substring(0, 50)}...`);
  }

  // Create initial heartbeat
  await prisma.heartbeat.create({
    data: { message: 'Initial heartbeat from seed' },
  });
  console.log('  ✓ Created initial heartbeat');

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
