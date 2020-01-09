import { Repository } from "typeorm";
import { Task } from "src/tasks/task.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private readonly TaskRepository: Repository<Task>) {

    }

    async tasks() {
        return await this.TaskRepository.find();
    }

    async task(id: number) {
        return await this.TaskRepository.findOne(id);
    }

    
}