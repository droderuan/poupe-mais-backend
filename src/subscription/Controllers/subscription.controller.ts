import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import * as Joi from 'joi';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { SubscriptionService } from '../Providers/subscription.service';
import { RequestCreateSubscriptionDTO } from '../DTOs';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  listSubscriptions() {
    return this.subscriptionService.list();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow('').default(''),
      }),
    ),
  )
  @Post()
  createSubscription(
    @Body() body: RequestCreateSubscriptionDTO,
    @Request() request,
  ) {
    return this.subscriptionService.create({ ...body, ...request.user });
  }
}
