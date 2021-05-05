import { Module } from '@nestjs/common';
import { ObjectiveService } from './Providers/objective.service';
import { ObjectiveController } from './Controllers/objective.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objective } from './Entities/objective.entitie';
import { User } from 'src/users/Entities/user.entitie';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Objective, User]), AuthModule],
  providers: [ObjectiveService],
  controllers: [ObjectiveController],
})
export class ObjectiveModule {}
