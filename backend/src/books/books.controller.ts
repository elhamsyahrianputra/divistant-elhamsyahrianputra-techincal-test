import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return {
      message: 'Book updated successfullyy',
      data: this.booksService.update(id, updateBookDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.booksService.remove(id);
    return {
      message: 'Book deleted successfully',
    };
  }
}
