import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import parse_token from './parse_token';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!(await parse_token(req.header['cognito-access-token']))) {
      return res.status(500).json({ code: 'Unauthorized' });
    }
    next();
  }
}
