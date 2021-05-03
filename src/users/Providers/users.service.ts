import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestCreateUserDTO, RequestUpdateUserDTO } from '../DTOs';
import { User } from '../Entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async userData({ userId }): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    delete user.password;

    return user;
  }

  async createUser(data: RequestCreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async updateUser(data: RequestUpdateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);

    await this.userRepository.save(user);

    return user;
  }
}
