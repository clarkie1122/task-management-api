import { Repository } from "typeorm";
import { TaskEntity } from "src/tasks/task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskDto } from "./task.graphql.schema";
import { CreateTaskInput } from "./create-task.input";

@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskEntity) private readonly TaskRepository: Repository<TaskEntity>) {

    }

    async findAll(): Promise<TaskEntity[]> {
        return await this.TaskRepository.find();
    }

    async findOne(id: number): Promise<TaskEntity> {
        return await this.TaskRepository.findOne(id);
    }

    async createOne(taskDto: CreateTaskInput): Promise<TaskEntity> {
        let task = new TaskEntity();

        task.title = taskDto.title;
        task.description = taskDto.description;
        task.status = taskDto.status;

        await this.TaskRepository.save(task);

        return task;
    }

    async removeOne(id: number) {
        const result = await this.TaskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with Id "${id}" not found.`);
        }
    }


}