import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/user.entities';
import { sign } from 'jsonwebtoken';
import { RequestAuthenticateDTO, ResponseAuthenticateDTO } from '../DTOs';

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async authenticate(
    userData: RequestAuthenticateDTO,
  ): Promise<ResponseAuthenticateDTO> {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    if (userData.password !== user.password) {
      throw new BadRequestException('Verify your informations');
    }

    const token = sign({}, process.env.APP_SECRET, {
      subject: user.id,
      expiresIn: process.env.APP_EXPIRES,
    });

    return { user, token };
  }
}
