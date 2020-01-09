import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaskService } from '../test/task.service';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TaskResolver } from 'src/test/task.resolver';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  providers: [TaskResolver, TaskService]
})
export class TasksModule {}
