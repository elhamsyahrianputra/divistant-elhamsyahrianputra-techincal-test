# API Documentation

## Base URL
```
http://localhost:3000
```

## Table of Contents
- [Authentication](#authentication)
- [Books API](#books-api)
- [Authors API](#authors-api)
- [Genres API](#genres-api)
- [Reviews API](#reviews-api)
- [Error Responses](#error-responses)

---

## Authentication

### Register New User

**Endpoint:** `POST /auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Login

**Endpoint:** `POST /auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "admin@bookshelf.com",
  "password": "admin123"
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "name": "Admin User",
      "email": "admin@bookshelf.com",
      "roles": [
        {
          "id": "uuid",
          "name": "admin"
        }
      ]
    }
  }
}
```

---

### Get Current User Profile

**Endpoint:** `GET /auth/profile`

**Access:** Protected (Requires JWT)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Profile fetched successfully",
  "data": {
    "id": "uuid",
    "name": "Admin User",
    "email": "admin@bookshelf.com",
    "roles": [
      {
        "id": "uuid",
        "name": "admin"
      }
    ]
  }
}
```

---

## Books API

### Get All Books

**Endpoint:** `GET /books`

**Access:** Public

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by title or description
- `author` (optional): Filter by author slug
- `genre` (optional): Filter by genre slug
- `sortBy` (optional): Sort field (title, publishedAt, createdAt)
- `sortOrder` (optional): Sort order (asc, desc)

**Example Request:**
```
GET /books?page=1&limit=10&search=harry&genre=fantasy&sortBy=title&sortOrder=asc
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Books fetched successfully",
  "data": {
    "items": [
      {
        "id": "uuid",
        "slug": "harry-potter-philosophers-stone",
        "title": "Harry Potter and the Philosopher's Stone",
        "isbn": "9780747532699",
        "publisher": "Bloomsbury",
        "publishedAt": "1997-06-26T00:00:00.000Z",
        "coverUrl": "/uploads/books/harry-potter.jpg",
        "pages": 223,
        "description": "The first novel in the Harry Potter series...",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z",
        "authors": [
          {
            "id": "uuid",
            "name": "J.K. Rowling",
            "slug": "jk-rowling"
          }
        ],
        "genres": [
          {
            "id": "uuid",
            "name": "Fantasy",
            "slug": "fantasy"
          }
        ],
        "reviews": [],
        "averageRating": 4.5,
        "totalReviews": 150
      }
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

---

### Get Book by Slug

**Endpoint:** `GET /books/:slug`

**Access:** Public

**Parameters:**
- `slug`: Book slug (e.g., "harry-potter-philosophers-stone")

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Book fetched successfully",
  "data": {
    "id": "uuid",
    "slug": "harry-potter-philosophers-stone",
    "title": "Harry Potter and the Philosopher's Stone",
    "isbn": "9780747532699",
    "publisher": "Bloomsbury",
    "publishedAt": "1997-06-26T00:00:00.000Z",
    "coverUrl": "/uploads/books/harry-potter.jpg",
    "pages": 223,
    "description": "The first novel in the Harry Potter series...",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z",
    "authors": [
      {
        "id": "uuid",
        "name": "J.K. Rowling",
        "slug": "jk-rowling",
        "birthPlace": "Yate, England",
        "birthDate": "1965-07-31T00:00:00.000Z",
        "imageUrl": "/uploads/authors/jk-rowling.jpg"
      }
    ],
    "genres": [
      {
        "id": "uuid",
        "name": "Fantasy",
        "slug": "fantasy",
        "description": "Fantasy genre books"
      }
    ],
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "Amazing book!",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "user": {
          "id": "uuid",
          "name": "John Doe"
        }
      }
    ],
    "averageRating": 4.5,
    "totalReviews": 150
  }
}
```

---

### Create Book

**Endpoint:** `POST /books`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body:**
```json
{
  "title": "New Book Title",
  "isbn": "9781234567890",
  "publisher": "Publisher Name",
  "publishedAt": "2026-01-01",
  "pages": 300,
  "description": "Book description here",
  "coverUrl": "/uploads/books/cover.jpg",
  "authors": ["author-uuid-1", "author-uuid-2"],
  "genres": ["genre-uuid-1", "genre-uuid-2"]
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "message": "Book created successfully",
  "data": {
    "id": "uuid",
    "slug": "new-book-title",
    "title": "New Book Title",
    "isbn": "9781234567890",
    "publisher": "Publisher Name",
    "publishedAt": "2026-01-01T00:00:00.000Z",
    "coverUrl": "/uploads/books/cover.jpg",
    "pages": 300,
    "description": "Book description here",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Update Book

**Endpoint:** `PATCH /books/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Parameters:**
- `id`: Book UUID

**Request Body:**
```json
{
  "title": "Updated Book Title",
  "isbn": "9781234567890",
  "publisher": "Updated Publisher",
  "publishedAt": "2026-01-01",
  "pages": 350,
  "description": "Updated description",
  "coverUrl": "/uploads/books/updated-cover.jpg",
  "authors": ["author-uuid-1"],
  "genres": ["genre-uuid-1"]
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Book updated successfully",
  "data": {
    "id": "uuid",
    "slug": "updated-book-title",
    "title": "Updated Book Title",
    "isbn": "9781234567890",
    "publisher": "Updated Publisher",
    "publishedAt": "2026-01-01T00:00:00.000Z",
    "coverUrl": "/uploads/books/updated-cover.jpg",
    "pages": 350,
    "description": "Updated description",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Delete Book

**Endpoint:** `DELETE /books/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parameters:**
- `id`: Book UUID

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Book deleted successfully"
}
```

---

## Authors API

### Get All Authors

**Endpoint:** `GET /authors`

**Access:** Public

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Authors fetched successfully",
  "data": {
    "items": [
      {
        "id": "uuid",
        "slug": "jk-rowling",
        "name": "J.K. Rowling",
        "birthPlace": "Yate, England",
        "birthDate": "1965-07-31T00:00:00.000Z",
        "description": "British author...",
        "imageUrl": "/uploads/authors/jk-rowling.jpg",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "totalBooks": 15
      }
    ],
    "meta": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

### Get Author by Slug

**Endpoint:** `GET /authors/:slug`

**Access:** Public

**Parameters:**
- `slug`: Author slug (e.g., "jk-rowling")

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Author fetched successfully",
  "data": {
    "id": "uuid",
    "slug": "jk-rowling",
    "name": "J.K. Rowling",
    "birthPlace": "Yate, England",
    "birthDate": "1965-07-31T00:00:00.000Z",
    "description": "British author...",
    "imageUrl": "/uploads/authors/jk-rowling.jpg",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "books": [
      {
        "id": "uuid",
        "slug": "harry-potter-philosophers-stone",
        "title": "Harry Potter and the Philosopher's Stone",
        "coverUrl": "/uploads/books/harry-potter.jpg",
        "publishedAt": "1997-06-26T00:00:00.000Z"
      }
    ]
  }
}
```

---

### Create Author

**Endpoint:** `POST /authors`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Author Name",
  "birthPlace": "City, Country",
  "birthDate": "1980-01-01",
  "description": "Author biography",
  "imageUrl": "/uploads/authors/author-name.jpg"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "message": "Author created successfully",
  "data": {
    "id": "uuid",
    "slug": "author-name",
    "name": "Author Name",
    "birthPlace": "City, Country",
    "birthDate": "1980-01-01T00:00:00.000Z",
    "description": "Author biography",
    "imageUrl": "/uploads/authors/author-name.jpg"
  }
}
```

---

### Update Author

**Endpoint:** `PATCH /authors/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Parameters:**
- `id`: Author UUID

**Request Body:**
```json
{
  "name": "Updated Author Name",
  "birthPlace": "Updated City",
  "birthDate": "1980-01-01",
  "description": "Updated biography",
  "imageUrl": "/uploads/authors/updated-author.jpg"
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Author updated successfully",
  "data": {
    "id": "uuid",
    "slug": "updated-author-name",
    "name": "Updated Author Name",
    ...
  }
}
```

---

### Delete Author

**Endpoint:** `DELETE /authors/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parameters:**
- `id`: Author UUID

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Author deleted successfully"
}
```

---

## Genres API

### Get All Genres

**Endpoint:** `GET /genres`

**Access:** Public

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Genres fetched successfully",
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Fantasy",
        "slug": "fantasy",
        "description": "Fantasy genre books",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "totalBooks": 45
      }
    ],
    "meta": {
      "total": 20,
      "page": 1,
      "limit": 10,
      "totalPages": 2
    }
  }
}
```

---

### Get Genre by Slug

**Endpoint:** `GET /genres/:slug`

**Access:** Public

**Parameters:**
- `slug`: Genre slug (e.g., "fantasy")

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Genre fetched successfully",
  "data": {
    "id": "uuid",
    "name": "Fantasy",
    "slug": "fantasy",
    "description": "Fantasy genre books",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "books": [
      {
        "id": "uuid",
        "slug": "harry-potter-philosophers-stone",
        "title": "Harry Potter and the Philosopher's Stone",
        "coverUrl": "/uploads/books/harry-potter.jpg",
        "publishedAt": "1997-06-26T00:00:00.000Z"
      }
    ]
  }
}
```

---

### Create Genre

**Endpoint:** `POST /genres`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Science Fiction",
  "description": "Science fiction genre books"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "message": "Genre created successfully",
  "data": {
    "id": "uuid",
    "name": "Science Fiction",
    "slug": "science-fiction",
    "description": "Science fiction genre books",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Update Genre

**Endpoint:** `PATCH /genres/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Parameters:**
- `id`: Genre UUID

**Request Body:**
```json
{
  "name": "Updated Genre Name",
  "description": "Updated description"
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Genre updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Genre Name",
    "slug": "updated-genre-name",
    "description": "Updated description"
  }
}
```

---

### Delete Genre

**Endpoint:** `DELETE /genres/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parameters:**
- `id`: Genre UUID

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Genre deleted successfully"
}
```

---

## Reviews API

### Get All Reviews

**Endpoint:** `GET /reviews`

**Access:** Public

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `bookId` (optional): Filter by book ID
- `userId` (optional): Filter by user ID

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Reviews fetched successfully",
  "data": {
    "items": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "Excellent book!",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "user": {
          "id": "uuid",
          "name": "John Doe"
        },
        "book": {
          "id": "uuid",
          "title": "Harry Potter",
          "slug": "harry-potter",
          "coverUrl": "/uploads/books/harry-potter.jpg"
        }
      }
    ],
    "meta": {
      "total": 200,
      "page": 1,
      "limit": 10,
      "totalPages": 20
    }
  }
}
```

---

### Create Review

**Endpoint:** `POST /reviews`

**Access:** Protected (Authenticated user)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "bookId": "book-uuid",
  "rating": 5,
  "comment": "This is an amazing book!"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "message": "Review created successfully",
  "data": {
    "id": "uuid",
    "rating": 5,
    "comment": "This is an amazing book!",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "user": {
      "id": "uuid",
      "name": "John Doe"
    },
    "book": {
      "id": "uuid",
      "title": "Harry Potter",
      "slug": "harry-potter"
    }
  }
}
```

---

### Update Review

**Endpoint:** `PATCH /reviews/:id`

**Access:** Protected (Review owner only)

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Parameters:**
- `id`: Review UUID

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review comment"
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Review updated successfully",
  "data": {
    "id": "uuid",
    "rating": 4,
    "comment": "Updated review comment",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Delete Review

**Endpoint:** `DELETE /reviews/:id`

**Access:** Protected (Review owner or Admin)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Parameters:**
- `id`: Review UUID

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "message": "Review deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Authentication Flow

1. **Register** a new user using `POST /auth/register`
2. **Login** with credentials using `POST /auth/login`
3. Save the `access_token` from login response
4. Include the token in `Authorization: Bearer <access_token>` header for protected endpoints
5. Token expires after 24 hours (configurable)

## Important Notes

### File Upload
- File upload untuk cover buku dan foto author dilakukan melalui endpoint terpisah atau file manager
- Setelah upload, gunakan URL file pada field `coverUrl` (books) atau `imageUrl` (authors)
- Format file yang diperbolehkan: jpg, jpeg, png, webp
- Maksimal ukuran file: 5MB

### Response Structure
- Method GET akan include relasi terkait (authors, genres, reviews)
- Method POST, PATCH, DELETE hanya return data utama tanpa relasi
- Untuk mendapatkan data lengkap setelah create/update, lakukan GET request ke endpoint detail

## Pagination

All list endpoints support pagination:
- Default page: 1
- Default limit: 10
- Maximum limit: 100

## Rate Limiting

- No rate limiting implemented (can be added in production)

## CORS

- CORS is enabled for all origins in development
- Configure specific origins in production

---

**Last Updated:** January 1, 2026  
**Version:** 1.0.0
