import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

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

  async getAll() {
    return await this.prisma.author.findMany();
  }

  async getById(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID: '${id}' not found`);
    }

    return author;
  }

  async getBySlug(slug: string) {
    const author = await this.prisma.author.findUnique({
      where: { slug },
    });

    if (!author) {
      throw new NotFoundException(`Author with Slug: '${slug}' not found`);
    }

    return author;
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

  async remove(id: string) {
    await this.getById(id);

    await this.prisma.author.delete({
      where: { id },
    });
  }
}
