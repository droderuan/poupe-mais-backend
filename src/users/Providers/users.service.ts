import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'src/subscription/Entities/subscription.entitie';
import { Repository } from 'typeorm';
import { RequestCreateUserDTO, RequestUpdateUserDTO } from '../DTOs';
import { User } from '../Entities/user.entitie';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async userData({ userId }): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['subscription'],
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    delete user.password;

    return user;
  }

  async createUser(data: RequestCreateUserDTO): Promise<User> {
    const checkEmail = this.userRepository.findOne({
      where: { email: data.email },
    });

    if (checkEmail) {
      throw new BadRequestException('E-mail already in use');
    }

    const subscription = await this.subscriptionRepository.findOne({
      where: { name: 'free' },
    });

    const user = this.userRepository.create(data);

    user.subscription = subscription;

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async updateUser(data: RequestUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(data.userId);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    user.name = data.name;
    user.last_name = data.last_name;
    user.phone = data.phone;

    if (data?.password && data.password === data.confirm_password) {
      user.password = data.password;
    } else {
      throw new BadRequestException('Verify the new password');
    }

    if (data?.subscription) {
      const subscription = await this.subscriptionRepository.findOne({
        where: { name: data.subscription },
      });

      if (!subscription) {
        throw new BadRequestException('Subscription does not exist');
      }

      user.subscription = subscription;
    }

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }
}
