import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthLocalGuard } from './passport-strategies/auth-local.guard';
import { Public } from './passport-strategies/auth-public.decorator';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthLocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Request() req, @Body() _: SignInDto) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body.username, body.password);
  }
}
