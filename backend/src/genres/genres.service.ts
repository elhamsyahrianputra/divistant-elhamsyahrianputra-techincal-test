import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateGenreDto) {
    try {
      return await this.prisma.genre.create({
        data: {
          ...request,
          slug: slugify(request.name, {
            trim: true,
            lower: true,
            strict: true,
          }),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Genre with Name: '${request.name}' already exists`,
        );
      }
      throw error;
    }
  }

  async getAll() {
    return await this.prisma.genre.findMany({
      include: {
        books: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.genre.findUnique({
      where: { id },
    });
  }

  async getBySlug(slug: string) {
    return await this.prisma.genre.findUnique({
      where: { slug },
    });
  }

  async update(id: string, request: UpdateGenreDto) {
    await this.getById(id);

    try {
      return await this.prisma.genre.update({
        where: { id },
        data: {
          ...request,
          ...(request.name
            ? {
                slug: slugify(request.name, {
                  trim: true,
                  lower: true,
                  strict: true,
                }),
              }
            : {}),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Genre with Name: '${request.name}' already exists`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.getById(id);

    await this.prisma.genre.delete({
      where: { id },
    });
  }
}
