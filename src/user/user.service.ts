import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

  async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    const salt = this.configService.get<number>('SALT');
    await user.setPassword(password, Number(salt));
    return user;
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    return true;
  }
}
