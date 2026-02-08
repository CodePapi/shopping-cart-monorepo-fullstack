import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import type { UserRole } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(params: {
    email: string;
    password: string;
    role?: UserRole;
    allowAdmin: boolean;
  }) {
    const existing = await this.usersService.findByEmail(params.email);
    if (existing) {
      throw new BadRequestException('Email is already registered.');
    }

    const role: UserRole =
      params.allowAdmin && params.role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER';

    const passwordHash = await bcrypt.hash(params.password, 12);
    const user = await this.usersService.createUser({
      email: params.email,
      passwordHash,
      role,
    });

    return this.buildAuthResponse(user);
  }

  async login(params: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(params.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const valid = await bcrypt.compare(params.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: {
    id: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
