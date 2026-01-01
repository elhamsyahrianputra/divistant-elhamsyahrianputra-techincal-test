import { Module } from '@nestjs/common';
import { UploadModule } from 'src/common/upload/upload.module';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [UploadModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
