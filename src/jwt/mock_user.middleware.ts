import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const userHeader = req.headers['x-user'];
    if (userHeader === 'admin') {
      req.user = { id: 1, username: 'admin', role: 'admin' };
    } else if (userHeader === 'user') {
      req.user = { id: 2, username: 'user1', role: 'user' };
    } else {
      req.user = null;
    }
    next();
  }
}

