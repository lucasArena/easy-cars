import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config';

import AppError from './errors/AppError';
import routes from './routes';

import './container';
import './database';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        status: 'error',
        description: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
      description: error.message,
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
