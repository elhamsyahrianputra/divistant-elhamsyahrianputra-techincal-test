import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post(':bookId')
  async create(
    @Request() req,
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Body() request: CreateReviewDto,
  ) {
    const userId = req.user.userId;
    return {
      message: 'Review created successfully',
      result: await this.reviewsService.createReview(userId, bookId, request),
    };
  }

  @Get('book/:bookId')
  async getByBook(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Query() queryParams: QueryParamsDto,
  ) {
    return {
      message: 'Reviews retrieved successfully',
      result: await this.reviewsService.getReviewsByBook(bookId, queryParams),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getByUser(
    @Request() req: { user: { userId: string } },
    @Query() queryParams: QueryParamsDto,
  ) {
    const userId = req.user.userId;
    return {
      message: 'User reviews retrieved successfully',
      result: await this.reviewsService.getReviewsByUser(userId, queryParams),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.reviewsService.deleteReview(id);
    return { message: 'Review deleted successfully' };
  }

  @Get('book/:bookId/average')
  async getAverage(@Param('bookId', ParseUUIDPipe) bookId: string) {
    return {
      message: 'Average rating retrieved successfully',
      result: await this.reviewsService.getAverageRating(bookId),
    };
  }
}
