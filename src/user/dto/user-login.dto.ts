import { IsEmail, IsString } from 'class-validator';
export class UserLoginDto {
  @IsEmail({}, { message: 'Incorrect Email' })
  email: string;

  @IsString({ message: 'No password' })
  password: string;
}
