import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '@inteck/global-components';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { TaskService } from './task.service';
import { AuthModule } from '../auth/auth.module';
import { TaskResolver } from './task.resolver';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Module({
  imports: [
    ClientsModule.register([{ name: 'TASK_SERVICE', transport: Transport.REDIS, options: { url: `redis://${REDIS_HOST}:${REDIS_PORT}` }}]),
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskResolver]
})
export class TasksModule {}
