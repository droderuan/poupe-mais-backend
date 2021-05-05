import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  RequestCreateTransactionTypeDTO,
  RequestUpdateTransactionTypeDTO,
} from '../DTOs';
import { TransactionType } from '../Entities/transactionType.entitie';

@Injectable()
export class TransactionTypeService {
  constructor(
    @InjectRepository(TransactionType)
    private transactionTypeRepository: Repository<TransactionType>,
  ) {}

  async list() {
    const transactionTypes = await this.transactionTypeRepository.find();

    return transactionTypes;
  }

  async create(
    data: RequestCreateTransactionTypeDTO,
  ): Promise<TransactionType> {
    const transactionType = this.transactionTypeRepository.create(data);

    transactionType.url = data.url ?? transactionType.url;

    await this.transactionTypeRepository.save(transactionType);

    return transactionType;
  }

  async update(
    data: RequestUpdateTransactionTypeDTO,
  ): Promise<TransactionType> {
    const transactionType = await this.transactionTypeRepository.findOne(
      data.id,
    );

    if (!data) {
      throw new BadRequestException('Transaction type does not exist');
    }

    transactionType.url = data.url ?? transactionType.url;

    transactionType.name = data.name ?? transactionType.url;

    await this.transactionTypeRepository.save(transactionType);

    return transactionType;
  }
}
