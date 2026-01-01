import { Injectable } from '@nestjs/common';
import { QueryParamsDto } from 'src/common/dto/query-params.dto';
import { type PaginatedResult } from 'src/common/utils/pagination.util';
import { QueryBuilder } from 'src/common/utils/query-builder.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  private queryBuilder: QueryBuilder;

  constructor(private prisma: PrismaService) {
    this.queryBuilder = new QueryBuilder({
      prisma: this.prisma,
      model: 'review',
      path: '/api/reviews',
      searchFields: ['comment'],
      allowedIncludes: ['book', 'user'],
      defaultSortBy: 'createdAt',
      defaultSortOrder: 'desc',
    });
  }

  async createReview(userId: string, bookId: string, request: CreateReviewDto) {
    return await this.prisma.review.create({
      data: {
        userId,
        bookId,
        ...request,
      },
      include: {
        book: true,
        user: { select: { name: true } },
      },
    });
  }

  async getReviewsByBook(
    bookId: string,
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    return this.queryBuilder.getAllWithCustomWhere({ bookId }, queryParams);
  }

  async getReviewsByUser(
    userId: string,
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    return this.queryBuilder.getAllWithCustomWhere({ userId }, queryParams);
  }

  async deleteReview(id: string) {
    return await this.prisma.review.delete({
      where: { id },
    });
  }

  async getAverageRating(bookId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { bookId },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return {
      average: aggregate._avg.rating || 0,
      totalReviews: aggregate._count.rating,
    };
  }
}
