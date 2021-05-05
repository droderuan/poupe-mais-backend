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
  RequestCreateTransactionDTO,
  RequestUpdateTransactionDTO,
} from '../DTOs';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { TransactionService } from '../Providers/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  list(@Request() request) {
    return this.transactionService.list(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required().allow('WITHDRAW', 'ENTRANCE'),
        description: Joi.string(),
        value: Joi.number().required(),
        tag_id: Joi.string().required(),
      }),
    ),
  )
  @Post()
  async createTransaction(
    @Body() body: RequestCreateTransactionDTO,
    @Request() request,
  ) {
    return await this.transactionService.create(body, request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        transaction_id: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required().allow('WITHDRAW', 'ENTRANCE'),
        description: Joi.string(),
        value: Joi.number().required(),
        tag_id: Joi.string().required(),
      }),
    ),
  )
  @Put()
  async updateTransaction(@Body() body: RequestUpdateTransactionDTO) {
    return await this.transactionService.update(body);
  }
}
