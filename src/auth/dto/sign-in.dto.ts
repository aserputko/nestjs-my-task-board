import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  username: string;

  @MinLength(10)
  password: string;
}
