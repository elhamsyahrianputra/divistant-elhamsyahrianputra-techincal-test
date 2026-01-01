import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParamsDto } from '../dto/query-params.dto';
import {
  calculatePagination,
  createPaginationLinks,
  createPaginationMeta,
  type PaginatedResult,
} from './pagination.util';

interface QueryBuilderOptions {
  prisma: PrismaService;
  model: keyof PrismaService;
  path: string;
  searchFields?: string[];
  allowedIncludes?: string[];
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
}

export class QueryBuilder {
  constructor(private options: QueryBuilderOptions) {}

  async getAll(queryParams?: QueryParamsDto): Promise<PaginatedResult<unknown>> {
    const {
      search,
      page = 1,
      limit = 10,
      includes,
      sortBy = this.options.defaultSortBy || 'createdAt',
      sortOrder = this.options.defaultSortOrder || 'desc',
    } = queryParams || {};

    // Build include object
    const includeRelations = this.buildIncludes(includes);

    // Build where clause
    const where = this.buildWhereClause(search);

    // Calculate pagination
    const { skip, take } = calculatePagination(page, limit);

    // Get model
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = this.options.prisma[this.options.model] as any;

    // Get total count
    const total = await model.count({ where });

    // Get paginated data
    const data = await model.findMany({
      where,
      skip,
      take,
      include: Object.keys(includeRelations).length > 0 ? includeRelations : undefined,
      orderBy: { [sortBy]: sortOrder },
    });

    // Create pagination meta
    const meta = createPaginationMeta(total, page, limit);

    // Create pagination links
    const queryParamsForLinks = this.buildQueryParamsForLinks({
      search,
      includes,
      sortBy,
      sortOrder,
    });

    const links = createPaginationLinks(
      this.options.path,
      page,
      limit,
      meta.total_pages,
      queryParamsForLinks,
    );

    return { data, meta, links };
  }

  async getAllWithCustomWhere(
    customWhere: Record<string, unknown>,
    queryParams?: QueryParamsDto,
  ): Promise<PaginatedResult<unknown>> {
    const {
      search,
      page = 1,
      limit = 10,
      includes,
      sortBy = this.options.defaultSortBy || 'createdAt',
      sortOrder = this.options.defaultSortOrder || 'desc',
    } = queryParams || {};

    // Build include object
    const includeRelations = this.buildIncludes(includes);

    // Build where clause and merge with custom where
    const searchWhere = this.buildWhereClause(search);
    const where = { ...customWhere, ...searchWhere };

    // Calculate pagination
    const { skip, take } = calculatePagination(page, limit);

    // Get model
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = this.options.prisma[this.options.model] as any;

    // Get total count
    const total = await model.count({ where });

    // Get paginated data
    const data = await model.findMany({
      where,
      skip,
      take,
      include: Object.keys(includeRelations).length > 0 ? includeRelations : undefined,
      orderBy: { [sortBy]: sortOrder },
    });

    // Create pagination meta
    const meta = createPaginationMeta(total, page, limit);

    // Create pagination links
    const queryParamsForLinks = this.buildQueryParamsForLinks({
      search,
      includes,
      sortBy,
      sortOrder,
    });

    const links = createPaginationLinks(
      this.options.path,
      page,
      limit,
      meta.total_pages,
      queryParamsForLinks,
    );

    return { data, meta, links };
  }

  private buildIncludes(includes?: string): Record<string, boolean> {
    if (!includes || !this.options.allowedIncludes) {
      return {};
    }

    return includes.split(',').reduce(
      (acc, key) => {
        const trimmedKey = key.trim();
        if (this.options.allowedIncludes?.includes(trimmedKey)) {
          acc[trimmedKey] = true;
        }
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }

  private buildWhereClause(search?: string): Record<string, unknown> {
    if (!search || !this.options.searchFields || this.options.searchFields.length === 0) {
      return {};
    }

    const orConditions = this.options.searchFields.map((field) => {
      // Handle nested fields (e.g., 'authors.name')
      if (field.includes('.')) {
        const [relation, relationField] = field.split('.');
        return {
          [relation]: {
            some: {
              [relationField]: { contains: search },
            },
          },
        };
      }

      // Simple field
      return {
        [field]: { contains: search },
      };
    });

    return { OR: orConditions };
  }

  private buildQueryParamsForLinks(params: {
    search?: string;
    includes?: string;
    sortBy: string;
    sortOrder: string;
  }): Record<string, string | number> {
    const queryParams: Record<string, string | number> = {};

    if (params.search) queryParams.search = params.search;
    if (params.includes) queryParams.includes = params.includes;
    if (params.sortBy !== (this.options.defaultSortBy || 'createdAt')) {
      queryParams.sortBy = params.sortBy;
    }
    if (params.sortOrder !== (this.options.defaultSortOrder || 'desc')) {
      queryParams.sortOrder = params.sortOrder;
    }

    return queryParams;
  }
}
