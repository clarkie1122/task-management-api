import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository
    ) { }

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(
        id: number,
        user: User
    ): Promise<Task> {
        // find single task based on id of task and userId
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with Id ${id} not found.`);
        }

        return found;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async deleteTask(
        id: number,
        user: User
    ): Promise<void> {
        // the reason we call delete over remove is that it reduces the amount of calls to db. If you call remove you have to supply the entity meaning you have to make a call to find
        // the entity. The delete method, you can make one single call and then do a check to see if any rows were effected.

        // delete task single task based on id and if it assigned to user logged in
        const result = await this.taskRepository.delete({ id, userId: user.id });

        // check if anything was deleted or not.
        if (result.affected === 0) {
            throw new NotFoundException(`Task with Id ${id} not found.`);
        }
    }

    async updateTaskStatus(
        id: number,
        status: TaskStatus,
        user: User
    ): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        task.save();
        return task;
    }
}
