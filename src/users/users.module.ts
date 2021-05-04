import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './Controllers/users.controller';
import { User } from './Entities/user.entitie';
import { UsersService } from './Providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Subscription } from 'src/subscription/Entities/subscription.entitie';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscription]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
