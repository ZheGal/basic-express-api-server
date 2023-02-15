import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '@prisma/client';
import { compare } from 'bcryptjs';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser({ name, email, password }: UserRegisterDto): Promise<UserModel | null> {
    const user = new User(email, name);
    const salt = this.configService.get<number>('SALT');
    await user.setPassword(password, Number(salt));
    const existedUser = await this.userRepository.find(email);
    if (existedUser) {
      return null;
    }
    return this.userRepository.create(user);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(email);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    return newUser.comparePassword(password);
  }
}
