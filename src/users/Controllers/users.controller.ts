import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UsePipes,
  Put,
} from '@nestjs/common';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { UsersService } from '../Providers/users.service';
import * as Joi from 'joi';
import { JwtAuthGuard } from '../../auth/Guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUser(@Request() request) {
    return this.usersService.userData(request.user);
  }

  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().required().min(6),
        confirm_password: Joi.ref('password'),
      }),
    ),
  )
  @Post()
  async createUser(@Body() body, @Request() data) {
    return await this.usersService.createUser({ ...body, ...data.user });
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string(),
        last_name: Joi.string(),
        phone: Joi.string(),
        password: Joi.string().min(6),
        confirm_password: Joi.ref('password'),
        subscription: Joi.string().allow('free', 'Premium'),
      }),
    ),
  )
  @Put()
  async updateUser(@Body() body, @Request() data) {
    return await this.usersService.updateUser({ ...body, ...data.user });
  }
}
