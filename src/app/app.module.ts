import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { ObjectiveModule } from '../objective/objective.module';
import { TransactionModule } from '../transaction/transaction.module';

import { Connection, getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import JwtConfiguration from '../auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [JwtConfiguration] }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    AuthModule,
    SubscriptionModule,
    ObjectiveModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
