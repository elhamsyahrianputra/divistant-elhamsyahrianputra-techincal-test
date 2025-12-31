import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

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

  async getReviewsByBook(bookId: string) {
    return await this.prisma.review.findMany({
      where: { bookId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReviewsByUser(userId: string) {
    return await this.prisma.review.findMany({
      where: { userId },
      include: {
        book: { select: { title: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
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
