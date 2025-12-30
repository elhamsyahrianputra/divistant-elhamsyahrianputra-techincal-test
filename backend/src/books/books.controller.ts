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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() request: CreateBookDto) {
    return {
      message: 'Book created successfully',
      result: await this.booksService.create(request),
    };
  }

  @Get()
  async findAll() {
    return {
      message: 'Books retrieved successfully',
      result: await this.booksService.getAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Book retreived successfully',
      result: await this.booksService.getById(id),
    };
  }

  @Get('slug/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return {
      message: 'Book retreived successfully',
      result: await this.booksService.getBySlug(slug),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateBookDto) {
    return {
      message: 'Book updated successfullyy',
      data: this.booksService.update(id, request),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.booksService.remove(id);
    return {
      message: 'Book deleted successfully',
    };
  }
}
