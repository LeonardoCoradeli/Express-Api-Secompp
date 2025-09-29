import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
    res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
    return;
  }
  next();
};

export default validateObjectId;