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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() request: CreateAuthorDto) {
    return {
      message: 'Author created successfully',
      result: await this.authorsService.create(request),
    };
  }

  @Get()
  async findAll() {
    return {
      message: 'Authors retrieved successfully',
      result: await this.authorsService.getAll(),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findByIds(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Author retreived successfully',
      result: await this.authorsService.getById(id),
    };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return {
      message: 'Author retreived successfully',
      result: await this.authorsService.getBySlug(slug),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateAuthorDto,
  ) {
    return {
      message: 'Author updated successfully',
      result: await this.authorsService.update(id, request),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.authorsService.remove(id);
    return {
      message: 'Author deleted successfully',
    };
  }
}
