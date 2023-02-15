import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
  async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    await user.setPassword(password);
    return user;
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    return true;
  }
}
