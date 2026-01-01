import { Module } from '@nestjs/common';
import { UploadModule } from 'src/common/upload/upload.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [UploadModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
