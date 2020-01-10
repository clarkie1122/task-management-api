import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { AuthModule } from 'src/auth/auth.module';
import { TaskResolver } from 'src/tasks/task.resolver';
import { TaskEntity } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  providers: [TaskResolver, TaskService]
})
export class TasksModule {}
