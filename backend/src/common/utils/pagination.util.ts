export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}

export interface PaginationLinks {
  self: string;
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export function calculatePagination(
  page: number = 1,
  limit: number = 10,
): { skip: number; take: number } {
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, Math.min(100, limit));

  return {
    skip: (validPage - 1) * validLimit,
    take: validLimit,
  };
}

export function createPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    page,
    limit,
    total_items: total,
    total_pages: totalPages,
  };
}

export function createPaginationLinks(
  path: string,
  page: number,
  limit: number,
  totalPages: number,
  queryParams?: Record<string, string | number>,
  appUrl?: string,
): PaginationLinks {
  const baseUrl = appUrl || process.env.APP_URL || 'http://localhost:3000';
  
  const buildUrl = (pageNum: number) => {
    const params = new URLSearchParams({
      page: pageNum.toString(),
      limit: limit.toString(),
      ...queryParams,
    });
    return `${baseUrl}${path}?${params.toString()}`;
  };

  return {
    self: buildUrl(page),
    first: buildUrl(1),
    last: buildUrl(totalPages),
    prev: page > 1 ? buildUrl(page - 1) : null,
    next: page < totalPages ? buildUrl(page + 1) : null,
  };
}
