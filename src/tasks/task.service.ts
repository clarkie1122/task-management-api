import { Repository } from "typeorm";
import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { User } from "../auth/user.entity";
import { ClientProxy, Transport, Client } from '@nestjs/microservices'

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASK_SERVICE') private readonly client: ClientProxy
    ) { }

    public async findAll() {
        console.log('GraphQL Method Hit - findAll');
        const response = await this.client.send<TaskEntity[]>(
            { type: 'get-tasks' },
            { someImaginaryParams: 42 }
        );
        console.log('GraphQL Method Response - findAll');
        return response.toPromise();
    }



    // async findAll(
    //     user: User
    // ): Promise<TaskEntity[]> {
    //     // find all tasks that are assigned to the currently signed in user
    //     return await this.TaskRepository.find({
    //         relations: ['user'],
    //         where: { user: user.id }
    //     });
    // }

    // async findOne(
    //     id: number,
    //     user: User
    // ): Promise<TaskEntity> {
    //     // find the task by the id, and also make sure that the user is assigned to that task
    //     const task = await this.TaskRepository.findOne({
    //         relations: ['user'],
    //         where: { id, user: user.id }
    //     });

    //     if (!task) {
    //         throw new NotFoundException(`Task with Id "${id}" not found.`);
    //     }

    //     return task;
    // }

    // async createOne(
    //     taskDto: CreateTaskDto,
    //     user: User
    // ): Promise<TaskEntity> {
    //     let task = new TaskEntity();

    //     // update the values in the entity we have just created
    //     task.title = taskDto.title;
    //     task.description = taskDto.description;
    //     task.status = taskDto.status;
    //     task.user = user;

    //     await this.TaskRepository.save(task);

    //     return task;
    // }

    // async removeOne(
    //     id: number,
    //     user: User
    // ): Promise<void> {
    //     // want to make sure the user is assigned to the task they are deleting, so this has been changed to a remove
    //     const task = await this.findOne(id, user);

    //     // remove the entity from the database
    //     await this.TaskRepository.remove(task);
    // }

    // async updateOne(
    //     taskDto: UpdateTaskDto,
    //     user: User
    // ): Promise<TaskEntity> {
    //     const task = await this.findOne(taskDto.id, user);

    //     // update the values in the entity that we just have found
    //     task.title = taskDto.title;
    //     task.description = taskDto.description;
    //     task.status = taskDto.status;

    //     await this.TaskRepository.save(task);

    //     return task;
    // }
}