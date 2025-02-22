import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthHashingService } from './auth-hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtStrategy } from './passport-strategies/auth-jwt.strategy';
import { AuthLocalStrategy } from './passport-strategies/auth-local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHashingService, AuthLocalStrategy, AuthJwtStrategy],
})
export class AuthModule {}
