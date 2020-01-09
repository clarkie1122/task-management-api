import { Resolver, Query, Args } from "@nestjs/graphql";
import { Task } from "./task.graphql.schema";
import { TaskService } from "./task.service";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "./user.graphql.schema";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Resolver(of => Task)
@UseGuards(AuthGuard()) 
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Query(() => [Task])
    async tasks() {
        return await this.taskService.tasks();
    }

    @Query(() => Task)
    async task(
        @Args({ name: 'id', type: () => Number }) id: number,
        @GetUser() user: User
    ) {
        return await this.taskService.task(id);
    }
}