import { faker } from '@faker-js/faker';
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

// Helper function untuk membuat slug
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Daftar genre buku yang real
const BOOK_GENRES = [
  { name: 'Fiction', description: 'Literary works of imaginative narration' },
  { name: 'Non-Fiction', description: 'Factual prose writing' },
  { name: 'Mystery', description: 'Stories involving crime and detection' },
  { name: 'Thriller', description: 'Suspenseful and exciting stories' },
  {
    name: 'Science Fiction',
    description: 'Speculative fiction based on science',
  },
  { name: 'Fantasy', description: 'Magical and supernatural elements' },
  { name: 'Romance', description: 'Love stories and relationships' },
  { name: 'Historical Fiction', description: 'Stories set in the past' },
  { name: 'Horror', description: 'Frightening and unsettling stories' },
  { name: 'Biography', description: 'Life stories of real people' },
  { name: 'Autobiography', description: 'Self-written life stories' },
  { name: 'Memoir', description: 'Personal memories and experiences' },
  { name: 'Self-Help', description: 'Personal development and improvement' },
  { name: 'Philosophy', description: 'Fundamental questions about existence' },
  { name: 'Psychology', description: 'Study of mind and behavior' },
  { name: 'Science', description: 'Scientific knowledge and discovery' },
  { name: 'History', description: 'Past events and their study' },
  { name: 'Travel', description: 'Journeys and explorations' },
  { name: 'Cooking', description: 'Food preparation and recipes' },
  { name: 'Art', description: 'Visual arts and creativity' },
  { name: 'Poetry', description: 'Verse and rhythmic expression' },
  { name: 'Drama', description: 'Theatrical works and plays' },
  { name: 'Comedy', description: 'Humorous and entertaining works' },
  { name: 'Adventure', description: 'Exciting and risky undertakings' },
  { name: 'Crime', description: 'Criminal activities and investigation' },
  { name: 'Young Adult', description: 'Literature for teenagers' },
  { name: 'Children', description: 'Books for young readers' },
  {
    name: 'Graphic Novel',
    description: 'Visual storytelling with illustrations',
  },
  { name: 'Business', description: 'Commerce and entrepreneurship' },
  { name: 'Economics', description: 'Economic theory and practice' },
  { name: 'Politics', description: 'Governance and political systems' },
  { name: 'Religion', description: 'Spiritual beliefs and practices' },
  { name: 'Sports', description: 'Athletic activities and competition' },
  { name: 'Technology', description: 'Technical innovation and development' },
  { name: 'Health', description: 'Physical and mental wellness' },
];

async function seedRoles() {
  console.log('🎭 Seeding Roles...');

  const roles = ['superadmin', 'admin', 'member'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
      },
    });
  }

  console.log('✅ Roles created: superadmin, admin, member');
}

async function seedUsers() {
  console.log('👥 Seeding Users...');

  const roles = await prisma.role.findMany();
  const superadminRole = roles.find((r) => r.name === 'superadmin');
  const adminRole = roles.find((r) => r.name === 'admin');
  const memberRole = roles.find((r) => r.name === 'member');

  // Hash password 'password'
  const hashedPassword = await bcrypt.hash('password', 10);

  // 1. Superadmin
  const superadmin = await prisma.user.create({
    data: {
      name: 'Super Administrator',
      email: 'superadmin@spacio.com',
      password: hashedPassword,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: superadmin.id,
      roleId: superadminRole!.id,
    },
  });

  console.log('✅ Superadmin created: superadmin@spacio.com');

  // 2. Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@spacio.com',
      password: hashedPassword,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: admin.id,
      roleId: adminRole!.id,
    },
  });

  console.log('✅ Admin created: admin@spacio.com');

  // 3. Elham Syahrian Putra
  const elham = await prisma.user.create({
    data: {
      name: 'Elham Syahrian Putra',
      email: 'elhamsyahrianputra@spacio.com',
      password: hashedPassword,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: elham.id,
      roleId: memberRole!.id,
    },
  });

  console.log('✅ Member created: elhamsyahrianputra@spacio.com');

  // 4. Random Members (150 members untuk bisa generate 1000 reviews)
  const memberUsers: any[] = [];
  for (let i = 0; i < 150; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
      },
    });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: memberRole!.id,
      },
    });

    memberUsers.push(user);
  }

  console.log(`✅ ${memberUsers.length} random members created`);
  console.log(`✅ Total users: ${memberUsers.length + 3}`);

  return { memberUsers };
}

async function seedGenres() {
  console.log('📚 Seeding Genres...');

  const genres: any[] = [];
  for (const genre of BOOK_GENRES) {
    const created = await prisma.genre.create({
      data: {
        name: genre.name,
        slug: createSlug(genre.name),
        description: genre.description,
      },
    });
    genres.push(created);
  }

  console.log(`✅ ${genres.length} genres created`);
  return genres;
}

async function seedAuthors() {
  console.log('✍️ Seeding Authors...');

  const authors: any[] = [];

  // 120 authors untuk variasi (beberapa tanpa buku, beberapa dengan banyak buku)
  for (let i = 0; i < 120; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    const author = await prisma.author.create({
      data: {
        name: fullName,
        slug: createSlug(fullName),
        birthPlace: faker.location.city() + ', ' + faker.location.country(),
        birthDate: faker.date.between({ from: '1920-01-01', to: '1995-12-31' }),
        description: faker.lorem.paragraph(),
        imageUrl: faker.image.avatar(),
      },
    });

    authors.push(author);
  }

  console.log(`✅ ${authors.length} authors created`);
  return authors;
}

async function seedBooks(authors: any[], genres: any[]) {
  console.log('📖 Seeding Books...');

  const books: any[] = [];

  // Buat total buku, lalu tentukan proporsi penulis
  const totalBooks = 210; // contoh jumlah, bisa disesuaikan
  const numTwoAuthors = Math.floor(totalBooks * 0.2); // 20%
  const numThreeAuthors = Math.floor(totalBooks * 0.1); // 10%
  const numOneAuthor = totalBooks - numTwoAuthors - numThreeAuthors;

  let bookIndex = 0;
  // 1 penulis
  for (let i = 0; i < numOneAuthor; i++) {
    const mainAuthor = faker.helpers.arrayElement(authors);
    const book = await createBook(bookIndex++, [mainAuthor], authors, genres, 1);
    books.push(book);
  }
  // 2 penulis
  for (let i = 0; i < numTwoAuthors; i++) {
    const mainAuthor = faker.helpers.arrayElement(authors);
    let coAuthor;
    do {
      coAuthor = faker.helpers.arrayElement(authors);
    } while (coAuthor.id === mainAuthor.id);
    const book = await createBook(bookIndex++, [mainAuthor, coAuthor], authors, genres, 2);
    books.push(book);
  }
  // 3 penulis
  for (let i = 0; i < numThreeAuthors; i++) {
    const mainAuthor = faker.helpers.arrayElement(authors);
    let coAuthor1, coAuthor2;
    do {
      coAuthor1 = faker.helpers.arrayElement(authors);
    } while (coAuthor1.id === mainAuthor.id);
    do {
      coAuthor2 = faker.helpers.arrayElement(authors);
    } while (coAuthor2.id === mainAuthor.id || coAuthor2.id === coAuthor1.id);
    const book = await createBook(bookIndex++, [mainAuthor, coAuthor1, coAuthor2], authors, genres, 3);
    books.push(book);
  }

  console.log(`✅ ${books.length} books created`);
  return books;
}

async function createBook(index: number, bookAuthors: any[], allAuthors: any[], allGenres: any[], numAuthors: number) {
  const title = faker.lorem.words({ min: 2, max: 5 });
  const slug = createSlug(title) + '-' + index;

  // Random 1-3 genres per book
  const numGenres = faker.number.int({ min: 1, max: 3 });
  const selectedGenres = faker.helpers.arrayElements(allGenres, numGenres);

  // Gunakan bookAuthors sesuai jumlah yang diinginkan (sudah unik dari pemanggil)
  const finalAuthors = bookAuthors.slice(0, numAuthors);

  const book = await prisma.book.create({
    data: {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      slug: slug,
      isbn: faker.datatype.boolean() ? faker.string.numeric(13) : null,
      publishedAt: faker.date.between({ from: '1950-01-01', to: '2024-12-31' }),
      coverUrl: faker.image.url(),
      pages: faker.number.int({ min: 100, max: 1200 }),
      description: faker.lorem.paragraphs(2),
      publisher: faker.company.name(),
      authors: {
        connect: finalAuthors.map((a) => ({ id: a.id })),
      },
      genres: {
        connect: selectedGenres.map((g) => ({ id: g.id })),
      },
    },
  });

  return book;
}

async function seedReviews(books: any[], memberUsers: any[]) {
  console.log('⭐ Seeding Reviews...');

  // 1000 reviews dari members
  const reviews: any[] = [];
  const reviewPairs = new Set(); // Track userId-bookId pairs untuk avoid duplicates

  let attempts = 0;
  const maxAttempts = 5000; // Prevent infinite loop

  while (reviews.length < 1000 && attempts < maxAttempts) {
    attempts++;

    const user = faker.helpers.arrayElement(memberUsers);
    const book = faker.helpers.arrayElement(books);
    const pairKey = `${user.id}-${book.id}`;

    // Skip if this user already reviewed this book
    if (reviewPairs.has(pairKey)) {
      continue;
    }

    try {
      const review = await prisma.review.create({
        data: {
          userId: user.id,
          bookId: book.id,
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
        },
      });

      reviews.push(review);
      reviewPairs.add(pairKey);

      if (reviews.length % 100 === 0) {
        console.log(`   ${reviews.length} reviews created...`);
      }
    } catch (error) {}
  }

  console.log(`✅ ${reviews.length} reviews created`);
}

async function main() {
  console.log('🌱 Starting seed...\n');

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.review.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    console.log('✅ Database cleared\n');

    // Seed data
    await seedRoles();
    const { memberUsers } = await seedUsers();
    const genres = await seedGenres();
    const authors = await seedAuthors();
    const books = await seedBooks(authors, genres);
    await seedReviews(books, memberUsers);

    console.log('\n✨ Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Roles: 3 (superadmin, admin, member)`);
    console.log(`   Users: ${memberUsers.length + 3}`);
    console.log(`   Genres: ${genres.length}`);
    console.log(`   Authors: ${authors.length}`);
    console.log(`   Books: ${books.length}`);
    console.log(`   Reviews: ~1000`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
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
