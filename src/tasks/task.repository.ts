import { Repository, EntityRepository } from "typeorm";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

// In each repository you need to supply the entity that you will be communicating with
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
    ): Promise<Task[]> {
        const { status, search } = filterDto;

        // query building is very powerful and enables you to write 'sql queries' inside the code
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id })

        if (status) {
            query.andWhere(`task.status = :status`, { status });
        }

        if (search) {
            // This will search for a partial match as a query. We need to wrap our search term in a percentage time so that it doesn't
            // matter what is before or after the search term I.E. TESTNESTJSTEST will be returned when NESTJS is searched for
            query.andWhere(`(task.title LIKE :search OR task.description LIKE :search)`, { search: `%${search}` });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get tasks for User "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
    ): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
        } catch (error) {
            this.logger.error(`Failed to create task for User "${user.username}". Data: ${createTaskDto}`, error.stack);
            throw new InternalServerErrorException();
        }

        delete task.user;

        return task;
    }
}