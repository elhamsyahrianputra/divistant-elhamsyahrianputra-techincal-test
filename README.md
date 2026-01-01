# Book Collection Management System

## 🚀 Deployment Links

**Frontend:**
👉 [https://divistant-elhamsyahrianputra-techin.vercel.app/](https://divistant-elhamsyahrianputra-techin.vercel.app/)

**Backend API:**
👉 [https://divistant-elhamsyahrianputra-techincal-test-production.up.railway.app/api](https://divistant-elhamsyahrianputra-techincal-test-production.up.railway.app/api)


Aplikasi pengelolaan koleksi buku dengan fitur CRUD lengkap, autentikasi JWT, dan sistem review. Dibangun menggunakan NestJS untuk backend dan Next.js untuk frontend.

## 📋 Table of Contents

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Spesifikasi Project](#-spesifikasi-project)
- [Prerequisites](#-prerequisites)
- [Instalasi & Setup](#-instalasi--setup)
- [Struktur Database](#-struktur-database)
- [API Documentation](#-api-documentation)
- [Sample Credentials](#-sample-credentials)
- [Project Structure](#-project-structure)
- [Development Notes](#-development-notes)

## ✨ Fitur

### Public Features
- ✅ Listing semua buku dengan pagination
- ✅ Pencarian dan filter buku (by title, author, genre)
- ✅ Detail lengkap buku (termasuk authors, genres, reviews)
- ✅ Halaman detail author
- ✅ Halaman listing genre
- ✅ Responsive design

### Authenticated Features
- ✅ Login & Logout dengan JWT Authentication
- ✅ CRUD Books (Create, Read, Update, Delete)
- ✅ CRUD Authors
- ✅ CRUD Genres
- ✅ Upload cover buku dan foto author
- ✅ Sistem review dan rating buku
- ✅ Role-based access control (Admin & User)

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind Variants
- **Icons**: Solar Icons
- **Linter**: Biome

### Backend
- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: SQLite (with Prisma ORM)
- **Authentication**: JWT (Passport.js)
- **Validation**: Class Validator & Class Transformer
- **File Upload**: Multer
- **Password Hashing**: Bcrypt
- **Linter**: Biome

## 📝 Spesifikasi Project

Project ini dikembangkan sesuai dengan requirement technical test Divistant untuk posisi Fullstack Web Developer - Junior Level.

### Frontend Requirements
- ✅ Base: React (Next.js)
- ✅ Halaman listing untuk semua buku
- ✅ Halaman detail lengkap buku
- ✅ Halaman login & fungsi logout
- ✅ CRUD untuk authenticated users
- ✅ State management menggunakan Zustand & React Query
- ✅ Styling dengan Tailwind CSS

### Backend Requirements
- ✅ Base: Node.js (NestJS)
- ✅ JWT-based authentication
- ✅ Protected endpoints dengan middleware
- ✅ Standard CRUD API untuk buku
- ✅ SQLite database dengan dummy data
- ✅ API documentation

### Bonus Features Implemented
- ✅ Menggunakan TypeScript (Frontend & Backend)
- ✅ Komponen-komponen modular
- ✅ Validasi form lengkap
- ✅ Pencarian/filter di halaman listing
- ✅ Additional features: Authors, Genres, Reviews system
- ✅ File upload untuk cover buku dan foto author
- ✅ Role-based access control
- ✅ Slug-based URLs untuk SEO-friendly

## 📦 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (v18 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd divistant-elhamsyahrianputra-techincal-test
```

### 2. Setup Project (Recommended - dari Root)

Cara tercepat untuk setup semua dependencies sekaligus:

```bash
# Install dependencies untuk backend dan frontend
npm install --prefix backend
npm install --prefix frontend

# Setup backend environment
cd backend
cp .env.example .env  # Linux/Mac
# atau: copy .env.example .env  # Windows

# Setup database & migrations
npx prisma migrate dev
npx prisma db seed
cd ..

# Setup frontend environment
cd frontend
# Buat file .env.local dengan isi:
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local  # Linux/Mac
# atau: echo NEXT_PUBLIC_API_URL=http://localhost:3001 > .env.local  # Windows
cd ..
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```
Backend akan berjalan di `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`

### Alternative: Manual Setup per Folder

Jika prefer setup manual per folder:

<details>
<summary><b>📦 Setup Backend Manual</b></summary>

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# atau di Windows: copy .env.example .env

# Setup database & run migrations
npx prisma migrate dev

# Seed database dengan dummy data
npx prisma db seed

# Start development server
npm run start:dev
```

Backend akan berjalan di `http://localhost:3001`

</details>

<details>
<summary><b>🎨 Setup Frontend Manual</b></summary>

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
# Di Linux/Mac:
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Di Windows (PowerShell):
echo NEXT_PUBLIC_API_URL=http://localhost:3001 > .env.local

# Atau buat manual file .env.local dengan isi:
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start development server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

</details>

### 4. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

## 🗄 Struktur Database

### Entity Relationship Diagram

```
User ──┬─< UserRole >─ Role
       │
       └──< Review >── Book ──┬── Author
                              │
                              └── Genre
```

### Tables

1. **users** - Data pengguna aplikasi
   - id, name, email, password, timestamps

2. **roles** - Role untuk access control
   - id, name, timestamps

3. **user_role** - Many-to-many relation antara User dan Role
   - id, userId, roleId, timestamps

4. **books** - Data koleksi buku
   - id, slug, title, isbn, publisher, publishedAt, coverUrl, pages, description, timestamps

5. **authors** - Data penulis buku
   - id, slug, name, birthPlace, birthDate, description, imageUrl, timestamps

6. **genres** - Kategori/genre buku
   - id, name, slug, description, timestamps

7. **reviews** - Review dan rating buku oleh user
   - id, userId, bookId, rating, comment, timestamps

## 📚 API Documentation

Dokumentasi API lengkap tersedia di file terpisah:

👉 **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**

Dokumentasi mencakup:
- Authentication endpoints (register, login, profile)
- Books CRUD endpoints dengan pagination & filter
- Authors CRUD endpoints
- Genres CRUD endpoints
- Reviews endpoints
- Request/Response examples lengkap
- Error handling
- Authentication flow
- Pagination

**Base URL:** `http://localhost:3001` (development)

**Authentication:** Gunakan Bearer token di header:
```
Authorization: Bearer <your-jwt-token>
```

## 🔐 Sample Credentials

Database sudah berisi 2 user dengan role berbeda:

### 1. Admin Account
```
Email: admin@spacio.com
Password: password
Role: admin
```

### 2. Member Account
```
Email: elhamsyahrianputra@spacio.com
Password: password
Role: member
```

**Note:** Gunakan account **admin** untuk mengakses fitur CRUD (Create, Update, Delete).

### Dummy Data

Database sudah berisi dummy data untuk:
- 15+ buku dengan cover images
- 10+ authors dengan profile images
- 35+ genres (Fiction, Mystery, Fantasy, dll)
- Sample reviews dan ratings

## 📁 Project Structure

```
├── backend/                 # NestJS Backend
│   ├── prisma/             # Database schema & migrations
│   │   ├── schema.prisma   # Prisma schema definition
│   │   ├── seed.ts         # Database seeder
│   │   └── migrations/     # Migration files
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── books/          # Books CRUD module
│   │   ├── authors/        # Authors CRUD module
│   │   ├── genres/         # Genres CRUD module
│   │   ├── reviews/        # Reviews module
│   │   ├── prisma/         # Prisma service
│   │   └── common/         # Shared utilities & filters
│   └── uploads/            # Uploaded files storage
│
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── core/          # Core utilities & services
│   │   └── features/      # Feature-based modules
│   └── public/            # Static assets
│
└── README.md              # This file
```

## 📝 Development Notes

### Code Quality
- Menggunakan **Biome** untuk linting dan formatting (backend & frontend)
- TypeScript strict mode enabled
- ESLint configured untuk additional checks
- Consistent code style

### Best Practices Implemented
- ✅ Modular component architecture
- ✅ Separation of concerns (Controller → Service → Repository)
- ✅ DTOs untuk validation
- ✅ Custom decorators untuk cleaner code
- ✅ Error handling dengan custom filters
- ✅ Response interceptor untuk consistent API response
- ✅ File upload dengan validation
- ✅ Slug generation untuk SEO-friendly URLs

## 🤝 Contributing

Jika ada pertanyaan atau saran, silakan hubungi:
- Email: [elhamsyahrianputra@gmail.com]
- GitHub: [@elhamsyahrianputra]

## 📄 License

This project is created for Divistant technical test purposes.

---

**Developed with ❤️ by Elham Syahrian Putra**

*Technical Test - Fullstack Web Developer - Junior Level - Divistant*
