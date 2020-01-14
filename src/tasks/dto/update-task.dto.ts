import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, IsIn } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

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
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;
}