import { Controller, Post, UseGuards, Request, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { AuthService } from '../Providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    ),
  )
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }
}
