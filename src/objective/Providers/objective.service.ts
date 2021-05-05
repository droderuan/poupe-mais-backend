import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/Entities/user.entitie';
import { Repository } from 'typeorm';
import {
  RequestCreateObjectiveDTO,
  RequestDeleteObjectiveDTO,
  RequestUpdateObjectiveDTO,
} from '../DTOs';
import { Objective } from '../Entities/objective.entitie';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(Objective)
    private objectiveRepository: Repository<Objective>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async list({ userId }) {
    const objectives = await this.objectiveRepository.find({
      where: { user_id: userId },
    });

    return objectives;
  }

  public async create(data: RequestCreateObjectiveDTO) {
    const user = await this.userRepository.findOne(data.userId, {
      relations: ['subscription'],
    });

    if (!user) {
      throw new BadRequestException('Objective does not exist');
    }

    const objectives = await this.objectiveRepository.find({
      where: { user_id: user.id },
    });

    if (
      objectives &&
      objectives.length === 1 &&
      user.subscription.name === 'Free'
    ) {
      throw new BadRequestException('User already has one objective');
    }

    const objective = this.objectiveRepository.create(data);

    objective.user = user;
    objective.already_placed = 0;

    await this.objectiveRepository.save(objective);

    return objective;
  }

  public async update(data: RequestUpdateObjectiveDTO) {
    const objective = await this.objectiveRepository.findOne(data.objective_id);

    if (!objective) {
      throw new BadRequestException('Objective does not exist');
    }

    objective.already_placed = data?.already_placed ?? objective.already_placed;
    objective.quantity = data?.quantity ?? objective.quantity;
    objective.name = data?.name ?? objective.name;

    console.log(objective);

    await this.objectiveRepository.save(objective);

    return objective;
  }

  public async delete(data: RequestDeleteObjectiveDTO) {
    const objective = await this.objectiveRepository.findOne(data.objectiveId);

    if (!objective) {
      throw new BadRequestException('Objective does not exist');
    }

    await this.objectiveRepository.delete(objective.id);
  }
}
