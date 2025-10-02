import User from '../models/User';
import { IUserDocument } from '../types/user.types';

class UserRepository {
  async create(userData: Partial<IUserDocument>): Promise<IUserDocument> {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email }).select('+password') as IUserDocument | null;
  }
}

export default new UserRepository();
