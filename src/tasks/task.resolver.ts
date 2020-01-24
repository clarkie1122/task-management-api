import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UseGuards, ValidationPipe } from "@nestjs/common";
import { UserEntity, TaskDto, CreateTaskDto, UpdateTaskDto } from '@inteck/global-components'

import { TaskService } from "./task.service";
import { GqlAuthGuard } from '../auth/gql-auth-guard';
import { GetUser } from "../auth/get-user.decorator";

@Resolver(of => TaskDto)
@UseGuards(GqlAuthGuard)
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Query(() => [TaskDto])
    async tasks() {
        return this.taskService.findAll();
    }

    @Mutation(() => TaskDto)
    async createTask(
        @Args('createTask', ValidationPipe) task: CreateTaskDto,
        @GetUser() user: UserEntity
    ) {

        return await this.taskService.createOne(task, user)
    }

    @Query(() => TaskDto)
    async task(
        @Args({ name: 'id', type: () => Number }) id: number,
        @GetUser() user: UserEntity
    ) {
        return await this.taskService.findOne(id, user);
    }

    @Mutation(() => TaskDto)
    async removeTask(
        @Args({ name: 'id', type: () => Number }) id: number,
        @GetUser() user: UserEntity
    ) {
        return await this.taskService.removeOne(id, user);
    }

    @Mutation(() => TaskDto)
    async updateTask(
        @Args('updateTask', ValidationPipe) task: UpdateTaskDto,
        @GetUser() user: UserEntity
    ) {
        return await this.taskService.updateOne(task, user)
    }
}