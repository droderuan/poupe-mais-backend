import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../Entities/subscription.entitie';
import { RequestCreateSubscriptionDTO } from '../DTOs';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  public async create(data: RequestCreateSubscriptionDTO) {
    const subscription = this.subscriptionRepository.create(data);

    subscription.description = data?.description ?? '';

    await this.subscriptionRepository.save(subscription);

    return subscription;
  }

  public async list() {
    const subscriptions = await this.subscriptionRepository.find();

    return subscriptions;
  }
}
