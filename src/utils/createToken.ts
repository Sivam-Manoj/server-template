import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export const createToken = async (
  payload: object,
  res: Response,
  jwtService: JwtService,
) => {
  // Sign the JWT token with the provided payload
  const token = jwtService.sign(payload);

  // Set the token in an HTTP-only cookie in the response
  res.cookie('jwt', token, {
    httpOnly: true, // Prevent JavaScript access to the cookie for security
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
    maxAge: 3600000 * 24, // Optional: Set expiration time (e.g., 1 hour)
  });
};
