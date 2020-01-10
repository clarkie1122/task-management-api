import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { AuthModule } from '../auth/auth.module';
import { TaskResolver } from './task.resolver';
import { TaskEntity } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  providers: [TaskResolver, TaskService]
})
export class TasksModule {}
