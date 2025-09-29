import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: any;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log do erro para debug
  console.error(err);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const mongooseErr = err as MongooseError.ValidationError;
    const message = Object.values(mongooseErr.errors).map(val => val.message);
    error = {
      name: 'ValidationError',
      message: message.join(', '),
      statusCode: 400
    };
  }

  // Erro de ID inválido do Mongoose
  if (err.name === 'CastError') {
    error = {
      name: 'CastError',
      message: 'Resource not found',
      statusCode: 404
    };
  }

  // Erro de duplicação (unique)
  if (err.code === 11000) {
    error = {
      name: 'DuplicateError',
      message: 'Duplicate field value entered',
      statusCode: 400
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

export default errorHandler;