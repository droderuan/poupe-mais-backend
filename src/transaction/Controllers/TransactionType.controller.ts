import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import * as Joi from 'joi';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import {
  RequestCreateTransactionTypeDTO,
  RequestUpdateTransactionTypeDTO,
} from '../DTOs';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { TransactionTypeService } from '../Providers/transactionType.service';

@Controller('transaction_types')
export class TransactionTypeController {
  constructor(
    private readonly transactionTypeService: TransactionTypeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  list() {
    return this.transactionTypeService.list();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string(),
      }),
    ),
  )
  @Post()
  async createTag(@Body() body: RequestCreateTransactionTypeDTO) {
    return await this.transactionTypeService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        url: Joi.string(),
      }),
    ),
  )
  @Put()
  async updateTag(@Body() body: RequestUpdateTransactionTypeDTO) {
    return await this.transactionTypeService.update(body);
  }
}
