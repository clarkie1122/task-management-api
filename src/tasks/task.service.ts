import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskEntity) private readonly TaskRepository: Repository<TaskEntity>) { }

    async findAll(user: User): Promise<TaskEntity[]> {
        return await this.TaskRepository.find({
            relations: ['user'],
            where: { task: { id: user.id } }
        });
    }

    async findOne(id: number): Promise<TaskEntity> {
        const task = await this.TaskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Task with Id "${id}" not found.`);
        }

        return task;
    }

    async createOne(taskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
        let task = new TaskEntity();

        task.title = taskDto.title;
        task.description = taskDto.description;
        task.status = taskDto.status;
        task.user = user;

        await this.TaskRepository.save(task);

        return task;
    }

    async removeOne(id: number): Promise<void> {
        const result = await this.TaskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with Id "${id}" not found.`);
        }
    }

    async updateOne(taskDto: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.findOne(taskDto.id);

        task.title = taskDto.title;
        task.description = taskDto.description;
        task.status = taskDto.status;

        await this.TaskRepository.save(task);

        return task;
    }
}