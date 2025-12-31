import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() request: CreateGenreDto) {
    return {
      message: 'Genre created successfully',
      result: await this.genresService.create(request),
    };
  }

  @Get()
  async findAll() {
    return {
      message: 'Genres retrieved successfully',
      result: await this.genresService.getAll(),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Genre retrieved successfully',
      result: await this.genresService.getById(id),
    };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return {
      message: 'Genre retrieved successfully',
      result: await this.genresService.getBySlug(slug),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() slug: UpdateGenreDto) {
    return {
      message: 'Genre updated successfully',
      result: await this.genresService.update(id, slug),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.genresService.remove(id);

    return {
      message: 'Genre deleted successfully',
    };
  }
}
