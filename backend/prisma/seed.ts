import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from './generated/client';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
});

async function main() {
  console.log('Sedang memulai proses seeding...');

  // 1. Seed Roles
  const roles = [{ name: 'superadmin' }, { name: 'admin' }, { name: 'member' }];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('Roles berhasil dibuat.');

  // 2. Ambil ID Role untuk Admin
  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  const memberRole = await prisma.role.findUnique({
    where: { name: 'member' },
  });

  if (!adminRole) {
    throw new Error('Admin role not found');
  }
  if (!memberRole) {
    throw new Error('Member role not found');
  }

  // 3. Seed User (Sample Credentials sesuai PDF)
  const hashedPassword = await bcrypt.hash('password', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@divistant.com' },
    update: {},
    create: {
      name: 'Admin Divistant',
      email: 'admin@divistant.com',
      password: hashedPassword,
      roles: {
        create: [{ roleId: adminRole.id }],
      },
    },
  });
  console.log('Sample user admin berhasil dibuat.');

  const memberUser = await prisma.user.upsert({
    where: { email: 'member@divistant.com' },
    update: {},
    create: {
      name: 'Member Divistant',
      email: 'member@divistant.com',
      password: hashedPassword,
      roles: {
        create: [{ roleId: memberRole.id }],
      },
    },
  });
  console.log('Sample user member berhasil dibuat.');

  // 4. Seed Dummy Books
  const books = [
    {
      title: 'The Pragmatic Programmer',
      isbn: '978-0135957059',
      description: 'Your journey to mastery. 20th Anniversary Edition.',
      published_at: new Date('2019-09-13'),
    },
    {
      title: 'Clean Code',
      isbn: '978-0132350884',
      description: 'A Handbook of Agile Software Craftsmanship.',
      published_at: new Date('2008-08-01'),
    },
    {
      title: 'You Dont Know JS Yet',
      isbn: '978-1491904244',
      description: 'Get started with the core of JavaScript.',
      published_at: new Date('2020-01-01'),
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }
  console.log('Dummy books berhasil dibuat.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
