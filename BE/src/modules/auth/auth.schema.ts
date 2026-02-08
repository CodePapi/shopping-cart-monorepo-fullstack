import { createZodDto } from 'nestjs-zod';
import {
  AuthResponseSchema,
  LoginSchema,
  RegisterSchema,
  UserSchema,
} from 'project-shared';

export class RegisterDto extends createZodDto(RegisterSchema) {}
export class LoginDto extends createZodDto(LoginSchema) {}
export class AuthResponse extends createZodDto(AuthResponseSchema) {}
export class UserResponse extends createZodDto(UserSchema) {}
