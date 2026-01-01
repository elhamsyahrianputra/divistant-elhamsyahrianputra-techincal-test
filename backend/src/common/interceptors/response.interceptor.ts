import {
  type CallHandler,
  type ExecutionContext,
  HttpStatus,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationLinks, PaginationMeta } from '../utils/pagination.util';

export interface Response<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  meta?: PaginationMeta;
  links?: PaginationLinks;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const statusCode = response.statusCode;

    // Pesan default tetap ada sebagai fallback
    const defaultMessage = 'Request successful';

    return next.handle().pipe(
      map((data) => {
        const responseData: Response<T> = {
          code: statusCode,
          status: HttpStatus[statusCode],
          message: data?.message || defaultMessage,
          data: undefined as T,
        };

        // Cek apakah data memiliki result dengan pagination (meta dan links)
        if (data?.result && typeof data.result === 'object') {
          const result = data.result;
          
          // Jika result adalah paginated response (memiliki data, meta, dan links)
          if (result.data && result.meta && result.links) {
            responseData.data = result.data;
            responseData.meta = result.meta;
            responseData.links = result.links;
          } else {
            // Result bukan paginated, gunakan langsung sebagai data
            responseData.data = result;
          }
        } else if (data?.message) {
          // Hanya ada message tanpa data
          // data tidak ditambahkan ke response jika undefined
        } else {
          // Tidak ada message dan result, gunakan data langsung
          responseData.data = data;
        }

        return responseData;
      }),
    );
  }
}
