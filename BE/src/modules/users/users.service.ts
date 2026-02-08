import { Injectable } from '@nestjs/common';
import type { UserRole } from 'src/modules/auth/auth.types';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(params: {
    email: string;
    passwordHash: string;
    role: UserRole;
  }) {
    return this.prisma.user.create({ data: params });
  }
}
