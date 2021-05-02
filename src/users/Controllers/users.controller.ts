import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import CreateUserDTO from '../DTOs/CreateUserDTO.request';
import { CreateUserValidationPipe } from '../Pipes/CreateUserValidation.pipe';
import { UsersService } from '../Providers/users.service';
import * as Joi from 'joi';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UsePipes(
    new CreateUserValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required().min(6),
        Confirm_password: Joi.ref('password'),
      }),
    ),
  )
  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return await this.usersService.createUser(data);
  }
}
