import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  // ✅ Define public routes here — no token needed
  private publicRoutes = [
    { path: '/taskflow-pro/auth/login', method: 'POST' },
    { path: '/taskflow-pro/auth/register', method: 'POST' },
  ];

  use(req: Request, res: Response, next: NextFunction) {
    // Check if current route is public
    const isPublic = this.publicRoutes.some(
      (route) => route.path === req.originalUrl && route.method === req.method,
    );

    if (isPublic) return next(); // skip auth for public routes

    // Protected route — check token
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, {
        secret: 'my-secret-key',
      });
      req['user'] = payload;
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
