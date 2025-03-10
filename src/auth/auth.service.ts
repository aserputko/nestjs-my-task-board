import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthHashingService } from './auth-hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly authHashingService: AuthHashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isValid = await this.authHashingService.compare(password, user.password);

    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async signUp(username: string, password: string) {
    try {
      const passwordHash = await this.authHashingService.hash(password);

      await this.usersService.create({ email: username, password: passwordHash });
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }
}
