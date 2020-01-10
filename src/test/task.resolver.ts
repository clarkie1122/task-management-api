import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { TaskDto } from "./task.graphql.schema";
import { TaskService } from "./task.service";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "./user.graphql.schema";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTaskInput } from "./create-task.input";

@Resolver(of => TaskDto)
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Query(() => [TaskDto])
    async tasks() {
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
        @Args('createTask') task: CreateTaskInput
    ) {
        return await this.taskService.createOne(task)
    }

    @Mutation(() => TaskDto)
    async removeTask(
        @Args({ name: 'id', type: () => Number }) id: number
    ) {
        return await this.taskService.removeOne(id);
    }
}