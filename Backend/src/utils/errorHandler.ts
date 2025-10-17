import { Request, Response, NextFunction } from 'express';
import { ApiError } from './apiError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ApiError) return res.status(err.statusCode).json({ error: err.message });
  res.status(500).json({ error: 'Internal Server Error' });
};
