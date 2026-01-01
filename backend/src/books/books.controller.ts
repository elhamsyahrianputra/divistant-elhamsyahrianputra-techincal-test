import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { ImageUrlTransformInterceptor } from 'src/common/interceptors/image-url-transform.interceptor';
import { UploadService } from 'src/common/upload/upload.service';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@UseInterceptors(ImageUrlTransformInterceptor)
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly uploadService: UploadService,
  ) {}

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
  async findAll(@Query() queryParams: QueryParamsDto) {
    return {
      message: 'Books retrieved successfully',
      result: await this.booksService.getAll(queryParams),
    };
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string, @Query('includes') includes?: string) {
    return {
      message: 'Book retreived successfully',
      result: await this.booksService.getById(id, includes),
    };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string, @Query('includes') includes?: string) {
    return {
      message: 'Book retreived successfully',
      result: await this.booksService.getBySlug(slug, includes),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post(':id/upload-cover')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadService = new UploadService();
          cb(null, uploadService.getUploadPath('books'));
        },
        filename: (req, file, cb) => {
          const uploadService = new UploadService();
          cb(null, uploadService.generateFileName(file, 'books'));
        },
      }),
      fileFilter: (req, file, cb) => {
        const uploadService = new UploadService();
        const allowedTypes = uploadService.getAllowedMimeTypes('image');
        if (!file.mimetype.match(allowedTypes)) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: new UploadService().getFileSizeLimit('books'),
      },
    }),
  )
  async uploadCover(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return {
        message: 'No file uploaded',
      };
    }

    const coverUrl = this.uploadService.getFileUrl(file.filename, 'books');
    const result = await this.booksService.updateCoverUrl(id, coverUrl);

    return {
      message: 'Cover image uploaded successfully',
      result: {
        ...result,
        coverUrl,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateBookDto) {
    return {
      message: 'Book updated successfullyy',
      result: await this.booksService.update(id, request),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.booksService.remove(id);
    return {
      message: 'Book deleted successfully',
    };
  }
}
