import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register new user
  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const user = await this.authService.create(createAuthDto, res);
    return res
      .status(201)
      .json({ message: 'User registered successfully', user });
  }

  // Login user
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password, res);
    return res.status(200).json({ message: 'Login successful', user });
  }

  // Get all users (for testing)
  @Get('users')
  async findAll(@Res() res: Response) {
    const users = await this.authService.findAll();
    return res.status(200).json({ users });
  }

  // Get user by ID (for testing)
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const user = await this.authService.findOne(id);
    return res.status(200).json({ user });
  }
}
