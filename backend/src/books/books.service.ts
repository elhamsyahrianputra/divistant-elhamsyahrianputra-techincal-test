import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        data: { ...request },
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
    return await this.prisma.book.findMany();
  }

  async getById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID '${id}' not found`);
    }

    return book;
  }

  async update(id: string, request: UpdateBookDto) {
    await this.getById(id);

    try {
      return await this.prisma.book.update({
        where: { id },
        data: request,
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

    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
