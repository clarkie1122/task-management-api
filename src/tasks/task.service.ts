import { Injectable, Inject } from "@nestjs/common";
import { TaskEntity } from "@inteck/global-components";
import { UserEntity, UpdateTaskDto, CreateTaskDto } from "@inteck/global-components";
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASK_SERVICE') private readonly client: ClientProxy
    ) { }

    public async findAll() {
        return await this.client.send(
            { type: 'get-tasks' },
            { someImaginaryParams: 42 }
        ).toPromise();
    }

    async findOne(
        id: number,
        user: UserEntity
    ): Promise<TaskEntity> {
        return await this.client.send(
            { type: 'get-task' },
            { id, user }
        ).toPromise();
    }

    async createOne(
        taskDto: CreateTaskDto,
        user: UserEntity
    ): Promise<TaskEntity> {
        return await this.client.send(
            { type: 'create-task' },
            { user, taskDto }
        ).toPromise();
    }

    async removeOne(
        id: number,
        user: UserEntity
    ): Promise<void> {
        return await this.client.send(
            { type: 'remove-task' },
            { id, user }
        ).toPromise();
    }

    async updateOne(
        taskDto: UpdateTaskDto,
        user: UserEntity
    ): Promise<TaskEntity> {
        return await this.client.send(
            { type: 'update-task' },
            { taskDto, user }
        ).toPromise();
    }
}