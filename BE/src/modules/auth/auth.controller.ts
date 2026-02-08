import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthResponse, LoginDto, RegisterDto } from './auth.schema';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiExtraModels(AuthResponse)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registers a new customer account.' })
  @ApiCreatedResponse({
    description: 'Returns the created user and a JWT token.',
    schema: { $ref: getSchemaPath(AuthResponse) },
  })
  @ApiBadRequestResponse({
    description: 'Returned when the email already exists or input is invalid.',
  })
  async register(
    @Body() dto: RegisterDto,
    @Headers('x-admin-secret') adminSecret?: string,
  ): Promise<AuthResponse> {
    const secret = this.configService.get<string>('ADMIN_CREATION_SECRET');
    const allowAdmin = Boolean(secret && adminSecret && adminSecret === secret);

    return this.authService.register({
      email: dto.email,
      password: dto.password,
      role: dto.role,
      allowAdmin,
    });
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticates a user and returns a JWT.' })
  @ApiCreatedResponse({
    description: 'Returns a signed JWT for the authenticated user.',
    schema: { $ref: getSchemaPath(AuthResponse) },
  })
  @ApiUnauthorizedResponse({
    description: 'Returned when credentials are invalid.',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login({ email: dto.email, password: dto.password });
  }
}
