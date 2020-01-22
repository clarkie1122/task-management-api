import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { AuthModule } from '../auth/auth.module';
import { TaskResolver } from './task.resolver';
import { TaskEntity } from './task.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{ name: 'TASK_SERVICE', transport: Transport.TCP}]),
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskResolver]
})
export class TasksModule {}
