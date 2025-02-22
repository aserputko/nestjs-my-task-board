import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  username: string;

  @MinLength(10)
  password: string;
}
