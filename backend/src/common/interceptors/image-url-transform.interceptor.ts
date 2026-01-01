import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageUrlTransformInterceptor implements NestInterceptor {
  private readonly baseUrl = process.env.APP_URL || 'http://localhost:3001';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          return this.transformUrls(data);
        }
        return data;
      }),
    );
  }

  private transformUrls(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    // Handle Date objects - return as-is to preserve date values
    if (obj instanceof Date) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformUrls(item));
    }

    if (typeof obj === 'object') {
      const transformed: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          
          // Transform URL fields
          if (
            (key === 'coverUrl' || key === 'imageUrl') &&
            typeof value === 'string' &&
            value.startsWith('/uploads/')
          ) {
            transformed[key] = `${this.baseUrl}${value}`;
          } else if (value instanceof Date) {
            // Preserve Date objects
            transformed[key] = value;
          } else if (typeof value === 'object') {
            transformed[key] = this.transformUrls(value);
          } else {
            transformed[key] = value;
          }
        }
      }
      return transformed;
    }

    return obj;
  }
}
