import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('/tasks')
// will return information in the '@Request()' decorator to each of the routes. This is based on the file 'JwtStrategy' so whatever is returned in the validate method is passed to
// that @Request parameter.
@UseGuards(AuthGuard()) 
export class TasksController {
    private logger = new Logger('TasksController');

    constructor(
        private tasksService: TasksService
    ) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,  // will make sure all the validation information in the entity is supplied correctly
        @GetUser() user: User // customer decorator for getting the user object from the access token in the request
    ){
        this.logger.verbose(`User "${user.username}"  retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
        // return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number, // parse pipe is shipped with nest, it will make sure the string provided can be converted to an int
        @GetUser() user: User // customer decorator for getting the user object from the access token in the request
    ): Promise<TaskEntity> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe) // will make sure all the validation information in the entities provided to the route is supplied correctly
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User // customer decorator for getting the user object from the access token in the request
    ) {
        this.logger.verbose(`User "${user.username}" creating new task. Data: ${JSON.stringify(createTaskDto)}`);
        // return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number, // parse pipe is shipped with nest, it will make sure the string provided can be converted to an int
        @GetUser() user: User
    ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number, // parse pipe is shipped with nest, it will make sure the string provided can be converted to an int
        @Body('status', TaskStatusValidationPipe) status: TaskStatus, // custom validation pipe to make sure the status provided is in the enum list
        @GetUser() user: User // customer decorator for getting the user object from the access token in the request
    ): Promise<TaskEntity> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
