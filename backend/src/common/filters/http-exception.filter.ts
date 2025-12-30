import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let status: string | undefined;
    let message: string | undefined;
    let errors: unknown;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resp = exceptionResponse as Record<string, unknown>;
      status =
        typeof resp.status === 'string'
          ? resp.status
          : typeof resp.error === 'string'
            ? resp.error.toUpperCase().replace(/ /g, '_')
            : undefined;
      message = typeof resp.message === 'string' ? resp.message : undefined;
      errors = resp.errors;
    } else {
      message =
        typeof exceptionResponse === 'string' ? exceptionResponse : undefined;
    }

    response.status(statusCode).json({
      code: statusCode,
      status,
      message,
      errors,
    });
  }
}
