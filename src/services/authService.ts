import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userRepository from '../repositories/userRepository';
import { IUser } from '../types/user.types';
import { AppError } from '../utils/errors';

class AuthService {
  private signToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async register(userData: IUser): Promise<{ token: string; user: IUser }> {
    const newUser = await userRepository.create(userData);

    // Remover a senha do objeto de usuário retornado
    const userResponse = newUser.toObject();
    delete userResponse.password;

    const token = this.signToken(newUser._id);
    return { token, user: userResponse };
  }

  async login(
    credentials: Pick<IUser, 'email' | 'password'>
  ): Promise<{ token: string }> {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password!))) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = this.signToken(user._id);
    return { token };
  }
}

export default new AuthService();
