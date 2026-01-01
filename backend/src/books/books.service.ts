import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        include: {
          authors: true,
          genres: true,
        },
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

  async getAll() {
    return await this.prisma.book.findMany({
      include: {
        authors: true,
        genres: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        authors: true,
        genres: true,
      }
    });

    if (!book) {
      throw new NotFoundException(`Book with ID: '${id}' not found`);
    }

    return book;
  }

  async getBySlug(slug: string) {
    const book = await this.prisma.book.findUnique({
      where: { slug },
    });

    if (!book) {
      throw new NotFoundException(`Book with Slug: '${slug}' not found`);
    }

    return book;
  }

  async update(id: string, request: UpdateBookDto) {
    try {
      await this.getById(id);

      // Prepare update data
      const updateData: any = {
        ...request,
      };

      // Only update authors if provided and not empty
      if (request.authors && request.authors.length > 0) {
        updateData.authors = {
          set: request.authors.map((author) => {
            return { id: author };
          }),
        };
      }

      // Only update genres if provided and not empty
      if (request.genres && request.genres.length > 0) {
        updateData.genres = {
          set: request.genres.map((genre) => {
            return { id: genre };
          }),
        };
      }

      return await this.prisma.book.update({
        where: { id },
        include: {
          authors: true,
          genres: true,
        },
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
      include: {
        authors: true,
        genres: true,
      },
    });
  }

  async remove(id: string) {
    await this.getById(id);

    await this.prisma.book.delete({
      where: { id },
    });
  }
}
