import { Request, Response } from 'express';
import authService from '../services/authService';
import { asyncHandler } from '../utils/asyncHandler';

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const { token, user } = await authService.register({ name, email, password });

    res.status(201).json({
      success: true,
      token,
      data: user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { token } = await authService.login({ email, password });

    res.status(200).json({
      success: true,
      token,
    });
  });
}

export default new AuthController();
