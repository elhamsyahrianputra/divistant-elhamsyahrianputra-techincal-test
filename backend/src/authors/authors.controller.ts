import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ImageUrlTransformInterceptor } from 'src/common/interceptors/image-url-transform.interceptor';
import { UploadService } from 'src/common/upload/upload.service';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
@UseInterceptors(ImageUrlTransformInterceptor)
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly uploadService: UploadService,
  ) {}

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
  @Post(':id/upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          const uploadService = new UploadService();
          cb(null, uploadService.getUploadPath('authors'));
        },
        filename: function (req, file, cb) {
          const uploadService = new UploadService();
          cb(null, uploadService.generateFileName(file, 'authors'));
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
        fileSize: new UploadService().getFileSizeLimit('authors'),
      },
    }),
  )
  async uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return {
        message: 'No file uploaded',
      };
    }

    const imageUrl = this.uploadService.getFileUrl(file.filename, 'authors');
    const result = await this.authorsService.updateImageUrl(id, imageUrl);

    return {
      message: 'Author image uploaded successfully',
      result: {
        ...result,
        imageUrl,
      },
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
