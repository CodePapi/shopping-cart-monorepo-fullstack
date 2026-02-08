import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthModule } from 'src/modules/auth/auth.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
