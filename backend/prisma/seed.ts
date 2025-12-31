import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';
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
  // 4. Seed Authors
  const authorData = [
    { name: 'Andrew Hunt', imageUrl: null },
    { name: 'Robert C. Martin', imageUrl: null },
    { name: 'Kyle Simpson', imageUrl: null },
  ];

  const authors: Array<{ id: string; name: string; slug: string }> = [];
  for (const a of authorData) {
    const slug = `${slugify(a.name, { lower: true, strict: true, trim: true })}`;
    const author = await prisma.author.upsert({
      where: { slug },
      update: {},
      create: {
        name: a.name,
        slug,
        imageUrl: a.imageUrl,
      },
    });
    authors.push(author as any);
  }
  console.log('Authors berhasil dibuat.');

  // 5. Seed Genres
  const genreData = ['Programming', 'Software Engineering', 'JavaScript'];
  const genres: Array<{ id: string; name: string }> = [];
  for (const g of genreData) {
    const slug = slugify(g, { lower: true, strict: true, trim: true });
    const genre = await prisma.genre.upsert({
      where: { name: g },
      update: {},
      create: { name: g, slug },
    });
    genres.push(genre as any);
  }
  console.log('Genres berhasil dibuat.');

  // 6. Seed Dummy Books
  const books = [
    {
      title: 'The Pragmatic Programmer',
      slug: `${slugify('The Pragmatic Programmer', {lower: true, strict: true, trim: true})}-${Date.now()}`,
      isbn: '978-0135957059',
      description: 'Your journey to mastery. 20th Anniversary Edition.',
      publishedAt: new Date('2019-09-13'),
      authorNames: ['Andrew Hunt'],
      genreNames: ['Programming', 'Software Engineering'],
    },
    {
      title: 'Clean Code',
      slug: `${slugify('Clean Code', {lower: true, strict: true, trim: true})}-${Date.now()}`,
      isbn: '978-0132350884',
      description: 'A Handbook of Agile Software Craftsmanship.',
      publishedAt: new Date('2008-08-01'),
      authorNames: ['Robert C. Martin'],
      genreNames: ['Software Engineering'],
    },
    {
      title: 'You Dont Know JS Yet',
      slug: `${slugify('You Dont Know JS Yet', {lower: true, strict: true, trim: true})}-${Date.now()}`,
      isbn: '978-1491904244',
      description: 'Get started with the core of JavaScript.',
      publishedAt: new Date('2020-01-01'),
      authorNames: ['Kyle Simpson'],
      genreNames: ['JavaScript', 'Programming'],
    },
    // Tambahan buku dummy
    ...Array.from({ length: 50 }).map((_, i) => ({
      title: `Dummy Book ${i+1}`,
      slug: `${slugify(`Dummy Book ${i+1}`, {lower: true, strict: true, trim: true})}-${Date.now()}`,
      isbn: `DUMMY-ISBN-${i+1}`,
      description: `Deskripsi buku dummy ke-${i+1}`,
      publishedAt: new Date(2020, 0, 1 + i),
      authorNames: [authors[i % authors.length].name],
      genreNames: [genres[i % genres.length].name],
    })),
  ];

  for (const book of books) {
    // prepare connect arrays for authors and genres
    const connectAuthors = (book as any).authorNames?.map((name: string) => {
      const found = authors.find((a) => a.name === name);
      return found ? { id: found.id } : undefined;
    }).filter(Boolean);

    const connectGenres = (book as any).genreNames?.map((name: string) => {
      const found = genres.find((g) => g.name === name);
      return found ? { id: found.id } : undefined;
    }).filter(Boolean);

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        slug: book.slug,
        isbn: book.isbn,
        description: book.description,
        publishedAt: book.publishedAt,
        authors: connectAuthors?.length ? { connect: connectAuthors } : undefined,
        genres: connectGenres?.length ? { connect: connectGenres } : undefined,
      },
    });
  }
  console.log('Dummy books berhasil dibuat.');
  // 7. Seed 100 Dummy Reviews
  const allBooks = await prisma.book.findMany();
  const allUsers = await prisma.user.findMany();
  if (allBooks.length && allUsers.length) {
    const reviewComments = [
      'Sangat bagus!',
      'Lumayan, tapi bisa lebih baik.',
      'Tidak sesuai ekspektasi.',
      'Rekomendasi untuk dibaca.',
      'Biasa saja.',
      'Luar biasa, sangat membantu!',
      'Kurang menarik.',
      'Penjelasan sangat jelas.',
      'Buku favorit saya.',
      'Cukup informatif.'
    ];
    for (let i = 0; i < 100; i++) {
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      const book = allBooks[Math.floor(Math.random() * allBooks.length)];
      const rating = Math.floor(Math.random() * 5) + 1;
      const comment = Math.random() > 0.3 ? reviewComments[Math.floor(Math.random() * reviewComments.length)] : null;
      try {
        await prisma.review.create({
          data: {
            userId: user.id,
            bookId: book.id,
            rating,
            comment,
          },
        });
      } catch (e) {
        // skip duplicate user-book review (unique constraint)
      }
    }
    console.log('100 dummy reviews berhasil dibuat.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
