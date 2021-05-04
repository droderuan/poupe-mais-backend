import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import * as Joi from 'joi';
import { required } from 'joi';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { RequestCreateSubscriptionDTO } from '../DTOs';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { SubscriptionService } from '../Providers/subscription.service';

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
  createSubscription(@Body() data: RequestCreateSubscriptionDTO) {
    return this.subscriptionService.create(data);
  }
}
