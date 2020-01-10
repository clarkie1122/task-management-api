import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/tasks/task-status.enum';

@InputType()
export class UpdateTaskDto {
    @Field(type => Number)
    @IsNotEmpty()
    id: number

    @Field(type => String, { nullable: true })
    @IsNotEmpty()
    title: string;

    @Field(type => String, { nullable: true })
    @IsNotEmpty()
    description: string;

    @Field(type => String, { nullable: true })
    @IsNotEmpty()
    status: TaskStatus;
}