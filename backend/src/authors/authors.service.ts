import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { buildIncludes } from 'src/common/utils/includes-builder.util';
import { type PaginatedResult } from 'src/common/utils/pagination.util';
import { QueryBuilder } from 'src/common/utils/query-builder.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private queryBuilder: QueryBuilder;
  private booksQueryBuilder: QueryBuilder;

  constructor(private prisma: PrismaService) {
    this.queryBuilder = new QueryBuilder({
      prisma: this.prisma,
      model: 'author',
      path: '/api/authors',
      searchFields: ['name', 'birthPlace', 'description'],
      allowedIncludes: ['books'],
      defaultSortBy: 'name',
      defaultSortOrder: 'asc',
    });

    this.booksQueryBuilder = new QueryBuilder({
      prisma: this.prisma,
      model: 'book',
      path: '/api/authors',
      searchFields: ['title', 'isbn', 'publisher', 'description'],
      allowedIncludes: ['genres'],
      defaultSortBy: 'updatedAt',
      defaultSortOrder: 'desc',
    });
  }

  async create(request: CreateAuthorDto) {
    return this.prisma.author.create({
      data: {
        ...request,
        slug: `${slugify(request.name, {
          lower: true,
          strict: true,
          trim: true,
        })}-${Date.now()}`,
        birthDate: request.birthDate ? new Date(request.birthDate) : null,
      },
    });
  }

  async getAll(
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    return this.queryBuilder.getAll(queryParams);
  }

  async getById(id: string, includes?: string) {
    const includeRelations = buildIncludes(includes, ['books']);

    const author = await this.prisma.author.findUnique({
      where: { id },
      ...(Object.keys(includeRelations).length > 0 && {
        include: includeRelations,
      }),
    });

    if (!author) {
      throw new NotFoundException(`Author with ID: '${id}' not found`);
    }

    return author;
  }

  async getBySlug(slug: string, includes?: string) {
    const includeRelations = buildIncludes(includes, ['books']);

    const author = await this.prisma.author.findUnique({
      where: { slug },
      ...(Object.keys(includeRelations).length > 0 && {
        include: includeRelations,
      }),
    });

    if (!author) {
      throw new NotFoundException(`Author with Slug: '${slug}' not found`);
    }

    return author;
  }

  async getBooks(
    authorId: string,
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    // Verify author exists
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID: '${authorId}' not found`);
    }

    // Use getAllWithCustomWhere to get books written by this author
    return this.booksQueryBuilder.getAllWithCustomWhere(
      {
        authors: {
          some: {
            id: authorId,
          },
        },
      },
      queryParams,
    );
  }

  async update(id: string, request: UpdateAuthorDto) {
    await this.getById(id);

    return await this.prisma.author.update({
      where: { id },
      data: {
        ...request,
        birthDate: request.birthDate ? new Date(request.birthDate) : null,
      },
    });
  }

  async updateImageUrl(id: string, imageUrl: string) {
    await this.getById(id);

    return await this.prisma.author.update({
      where: { id },
      data: { imageUrl },
    });
  }

  async remove(id: string) {
    await this.getById(id);

    await this.prisma.author.delete({
      where: { id },
    });
  }
}
