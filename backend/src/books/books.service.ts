import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import slugify from 'slugify';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { buildIncludes } from 'src/common/utils/includes-builder.util';
import { type PaginatedResult } from 'src/common/utils/pagination.util';
import { QueryBuilder } from 'src/common/utils/query-builder.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private queryBuilder: QueryBuilder;

  constructor(private prisma: PrismaService) {
    this.queryBuilder = new QueryBuilder({
      prisma: this.prisma,
      model: 'book',
      path: '/api/books',
      searchFields: [
        'title',
        'isbn',
        'publisher',
        'description',
        'authors.name',
        'genres.name',
      ],
      allowedIncludes: ['authors', 'genres', 'reviews'],
      defaultSortBy: 'updatedAt',
      defaultSortOrder: 'desc',
    });
  }

  async create(request: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        data: {
          ...request,
          slug: `${slugify(request.title, {
            lower: true,
            strict: true,
            trim: true,
          })}-${Date.now()}`,
          authors: {
            connect: request.authors.map((author) => {
              return { id: author };
            }),
          },
          genres: {
            connect: request.genres.map((genre) => {
              return { id: genre };
            }),
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Book with ISBN: '${request.isbn}' already exists`,
        );
      }
      throw error;
    }
  }

  async getAll(
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    const result = await this.queryBuilder.getAll(queryParams);
    
    // Calculate averageRating if reviews are included
    if (Array.isArray(result.data) && result.data.length > 0) {
      result.data = result.data.map((book: any) => {
        if (book.reviews && Array.isArray(book.reviews)) {
          const avgRating = book.reviews.length > 0
            ? book.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / book.reviews.length
            : 0;
          return {
            ...book,
            averageRating: parseFloat(avgRating.toFixed(2)),
          };
        }
        return book;
      });
    }
    
    return result;
  }

  async getById(id: string, includes?: string) {
    // Default to authors and genres if no includes specified
    const defaultIncludes = includes || 'authors,genres';
    const includeRelations = buildIncludes(defaultIncludes, [
      'authors',
      'genres',
      'reviews',
    ]);

    const book = await this.prisma.book.findUnique({
      where: { id },
      ...(Object.keys(includeRelations).length > 0 && {
        include: includeRelations,
      }),
    });

    if (!book) {
      throw new NotFoundException(`Book with ID: '${id}' not found`);
    }

    // Calculate averageRating if reviews are included
    if ((book as any).reviews && Array.isArray((book as any).reviews)) {
      const avgRating = (book as any).reviews.length > 0
        ? (book as any).reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / (book as any).reviews.length
        : 0;
      return {
        ...book,
        averageRating: parseFloat(avgRating.toFixed(2)),
      };
    }

    return book;
  }

  async getBySlug(slug: string, includes?: string) {
    // Default to authors and genres if no includes specified
    const defaultIncludes = includes || 'authors,genres';
    const includeRelations = buildIncludes(defaultIncludes, [
      'authors',
      'genres',
      'reviews',
    ]);

    const book = await this.prisma.book.findUnique({
      where: { slug },
      ...(Object.keys(includeRelations).length > 0 && {
        include: includeRelations,
      }),
    });

    if (!book) {
      throw new NotFoundException(`Book with Slug: '${slug}' not found`);
    }

    // Calculate averageRating if reviews are included
    if ((book as any).reviews && Array.isArray((book as any).reviews)) {
      const avgRating = (book as any).reviews.length > 0
        ? (book as any).reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / (book as any).reviews.length
        : 0;
      return {
        ...book,
        averageRating: parseFloat(avgRating.toFixed(2)),
      };
    }

    return book;
  }

  async update(id: string, request: UpdateBookDto) {
    try {
      await this.getById(id);

      // Prepare update data - exclude authors and genres from spread
      const { authors, genres, ...restRequest } = request;
      const updateData: Prisma.BookUpdateInput = {
        ...restRequest,
      };

      // Only update authors if provided and not empty
      if (authors && authors.length > 0) {
        updateData.authors = {
          set: authors.map((author) => {
            return { id: author };
          }),
        };
      }

      // Only update genres if provided and not empty
      if (genres && genres.length > 0) {
        updateData.genres = {
          set: genres.map((genre) => {
            return { id: genre };
          }),
        };
      }

      return await this.prisma.book.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Book with ISBN: '${request.isbn}' already exists`,
        );
      }
      throw error;
    }
  }

  async updateCoverUrl(id: string, coverUrl: string) {
    await this.getById(id);

    return await this.prisma.book.update({
      where: { id },
      data: { coverUrl },
    });
  }

  async remove(id: string) {
    await this.getById(id);

    await this.prisma.book.delete({
      where: { id },
    });
  }
}
