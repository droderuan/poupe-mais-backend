import { Module } from '@nestjs/common';
import { TransactionService } from './Providers/transaction.service';
import { TransactionTypeService } from './Providers/transactionType.service';
import { TransactionController } from './Controllers/transaction.controller';
import { TransactionTypeController } from './Controllers/TransactionType.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/Entities/user.entitie';
import { Transaction } from './Entities/transaction.entitie';
import { TransactionType } from './Entities/transactionType.entitie';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction, TransactionType]),
    AuthModule,
  ],
  providers: [TransactionService, TransactionTypeService],
  controllers: [TransactionController, TransactionTypeController],
})
export class TransactionModule {}
