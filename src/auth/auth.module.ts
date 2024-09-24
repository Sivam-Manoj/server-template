import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Replace with your secret
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Ensure JwtStrategy is included here
})
export class AuthModule {}
