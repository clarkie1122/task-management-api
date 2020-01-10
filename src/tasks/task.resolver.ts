import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { TaskDto } from "./task.graphql.schema";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "graphql-tools";

@Resolver(of => TaskDto)
@UseGuards(AuthGuard())
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Query(() => [TaskDto])
    async tasks(@Req() req: Request) {
        console.log(req);
        return await this.taskService.findAll();
    }

    @Query(() => TaskDto)
    async task(
        @Args({ name: 'id', type: () => Number }) id: number
    ) {
        return await this.taskService.findOne(id);
    }

    @Mutation(() => TaskDto)
    async createTask(
        @Args('createTask') task: CreateTaskDto
    ) {
        return await this.taskService.createOne(task)
    }

    @Mutation(() => TaskDto)
    async removeTask(
        @Args({ name: 'id', type: () => Number }) id: number
    ) {
        return await this.taskService.removeOne(id);
    }

    @Mutation(() => TaskDto)
    async updateTask(
        @Args('updateTask') task: UpdateTaskDto
    ) {
        return await this.taskService.updateOne(task)
    }
}