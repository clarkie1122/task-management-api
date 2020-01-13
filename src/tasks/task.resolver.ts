import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UseGuards, Req } from "@nestjs/common";
import { TaskDto } from "./task.graphql.schema";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GqlAuthGuard } from '../auth/gql-auth-guard';
import { User } from "../auth/user.graphql.schema";
import { GetUser } from "../auth/get-user.decorator";

@Resolver(of => TaskDto)
@UseGuards(GqlAuthGuard)
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Query(() => [TaskDto])
    async tasks(@GetUser() user: User) {
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