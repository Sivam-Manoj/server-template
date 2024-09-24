import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { createToken } from '../utils/createToken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService, // For token generation
  ) {}

  // Create a new user (register)
  async create(createAuthDto: CreateAuthDto, res: Response): Promise<Auth> {
    const newUser = this.authRepository.create(createAuthDto);
    await this.authRepository.save(newUser);

    // Create token for the new user and set in cookies
    await createToken(
      { userId: newUser.id, email: newUser.email },
      res,
      this.jwtService,
    );

    return newUser;
  }

  // Validate user credentials (login)
  async validateUser(
    email: string,
    plainPassword: string,
    res: Response,
  ): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(plainPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create JWT and set in cookies
    await createToken(
      { userId: user.id, email: user.email },
      res,
      this.jwtService,
    );

    return user;
  }

  // Find all users (for testing purposes)
  async findAll(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  // Find a user by ID (optional)
  async findOne(id: number): Promise<Auth> {
    const user = await this.authRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
