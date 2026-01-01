import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import slugify from 'slugify';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { buildIncludes } from 'src/common/utils/includes-builder.util';
import { type PaginatedResult } from 'src/common/utils/pagination.util';
import { QueryBuilder } from 'src/common/utils/query-builder.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  private queryBuilder: QueryBuilder;
  private booksQueryBuilder: QueryBuilder;

  constructor(private prisma: PrismaService) {
    this.queryBuilder = new QueryBuilder({
      prisma: this.prisma,
      model: 'genre',
      path: '/api/genres',
      searchFields: ['name', 'description'],
      allowedIncludes: ['books'],
      defaultSortBy: 'name',
      defaultSortOrder: 'asc',
    });

    this.booksQueryBuilder = new QueryBuilder({
      prisma: this.prisma,
      model: 'book',
      path: '/api/genres',
      searchFields: ['title', 'isbn', 'publisher', 'description'],
      allowedIncludes: ['authors', 'genres'],
      defaultSortBy: 'updatedAt',
      defaultSortOrder: 'desc',
    });
  }

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

  async getAll(
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    return this.queryBuilder.getAll(queryParams);
  }

  async getById(id: string, includes?: string) {
    const includeRelations = buildIncludes(includes, ['books']);

    return await this.prisma.genre.findUnique({
      where: { id },
      ...(Object.keys(includeRelations).length > 0 && {
        include: includeRelations,
      }),
    });
  }

  async getBySlug(slug: string, includes?: string) {
    const includeRelations = buildIncludes(includes, ['books']);

    return await this.prisma.genre.findUnique({
      where: { slug },
      ...(Object.keys(includeRelations).length > 0 && {
        include: includeRelations,
      }),
    });
  }

  async getBooks(
    genreId: string,
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    // Verify genre exists
    const genre = await this.prisma.genre.findUnique({
      where: { id: genreId },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID: '${genreId}' not found`);
    }

    // Use getAllWithCustomWhere to get books filtered by genre
    return this.booksQueryBuilder.getAllWithCustomWhere(
      {
        genres: {
          some: {
            id: genreId,
          },
        },
      },
      queryParams,
    );
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
