import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import parse_token from './parse_token';
import { refreshTokens } from '../auth/congito_auth';
const errorResponse = { code: 'Unauthorized' };
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.header('cognito-access-token');
    const refreshToken = req.header('cognito-refresh-token');
    if (!accessToken) return res.status(500).json(errorResponse);
    if (!(await parse_token(accessToken))) {
      if (!refreshToken) return res.status(500).json(errorResponse);
      try {
        const response = await refreshTokens({ refreshToken: refreshToken });
        return res.json(response);
      } catch (error) {
        return res.status(500).json(errorResponse);
      }
    } else return next();
  }
}
