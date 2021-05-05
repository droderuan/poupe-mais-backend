import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/Entities/user.entitie';
import { Repository } from 'typeorm';
import {
  RequestCreateTransactionDTO,
  RequestUpdateTransactionDTO,
} from '../DTOs';
import { Transaction } from '../Entities/transaction.entitie';
import { TransactionType } from '../Entities/transactionType.entitie';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionType)
    private transactionTypeRepository: Repository<TransactionType>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async list(userId: string) {
    const transactionTypes = await this.transactionRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['tag'],
    });

    return transactionTypes;
  }

  async create(
    data: RequestCreateTransactionDTO,
    userId: string,
  ): Promise<Transaction> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const tag = await this.transactionTypeRepository.findOne(data.tag_id);

    if (!tag) {
      throw new BadRequestException('Tag does not exist');
    }

    const transaction = this.transactionRepository.create(data);

    transaction.user = user;
    transaction.tag = tag;

    await this.transactionRepository.save(transaction);

    return transaction;
  }

  async update(data: RequestUpdateTransactionDTO): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne(
      data.transaction_id,
    );

    if (!transaction) {
      throw new BadRequestException('Transaction does not exist');
    }

    const tag = await this.transactionTypeRepository.findOne(data.tag_id);

    if (!tag) {
      throw new BadRequestException('Tag does not exist');
    }

    transaction.type = data.type ?? transaction.type;
    transaction.name = data.name ?? transaction.name;
    transaction.value = data.value ?? transaction.value;
    transaction.description = data.description ?? transaction.description;
    transaction.tag = tag;

    await this.transactionRepository.save(transaction);

    return transaction;
  }
}
