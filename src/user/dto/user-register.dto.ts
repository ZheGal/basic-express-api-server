import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Incorrect Email' })
  email: string;

  @IsString({ message: 'No password' })
  password: string;

  @IsString({ message: 'No users name' })
  name: string;
}
