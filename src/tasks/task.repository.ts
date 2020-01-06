import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks({status, search}: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere(`task.status = :status`, { status });
        }

        if (search) {
            // This will search for a partial match as a query. We need to wrap our search term in a percentage time so that it doesn't
            // matter what is before or after the search term I.E. TESTNESTJSTEST will be returned when NESTJS is searched for
            query.andWhere(`(task.title LIKE :search OR task.description LIKE :search)`, { search: `%${search}` });
        }

        const tasks = await query.getMany();
        return tasks;
    }
    
    async createTask({title, description}: CreateTaskDto): Promise<Task> {
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}