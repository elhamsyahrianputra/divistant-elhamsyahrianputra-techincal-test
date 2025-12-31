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
      },
    });
  }

  async getById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
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

      return await this.prisma.book.update({
        where: { id },
        include: {
          authors: true,
        },
        data: {
          ...request,
          authors: {
            set: request.authors?.map((author) => {
              return { id: author };
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

  async remove(id: string) {
    await this.getById(id);

    await this.prisma.book.delete({
      where: { id },
    });
  }
}
