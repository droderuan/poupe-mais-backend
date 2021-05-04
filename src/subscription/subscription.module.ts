import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SubscriptionController } from './Controllers/subscription.controller';
import { Subscription } from './Entities/subscription.entitie';
import { SubscriptionService } from './Providers/subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), AuthModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
