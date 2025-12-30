import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(err: unknown, user: TUser | null, info?: Error | string): TUser {
    if (err) throw err as Error;
    if (!user) {
      const detail =
        typeof info === 'string'
          ? info
          : info && typeof (info as Error).message === 'string'
            ? (info as Error).message
            : 'Unauthorized';

      throw new UnauthorizedException({
        code: 401,
        status: 'UNAUTHORIZED',
        message: detail,
      });
    }

    return user as TUser;
  }
}
