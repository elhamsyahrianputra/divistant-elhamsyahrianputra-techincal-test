import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterDto) {
    try {
      const roleMember = await this.prisma.role.findUnique({
        where: {
          name: 'member',
        },
      });

      if (!roleMember) {
        throw new BadRequestException("Role 'member' does not exist.");
      }

      const hashedPassword = await bcrypt.hash(request.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...request,
          password: hashedPassword,
          roles: {
            create: [
              {
                roleId: roleMember.id,
              },
            ],
          },
        },
      });

      const { password, ...result } = user;
      return result;
    } catch (error) {
      // Tangkap error unik Prisma (misal email sudah terdaftar)
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async login(request: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: request.email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const roles = user.roles.map((userRole) => userRole.role.name);

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles,
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: roles,
      },
    };
  }
}
