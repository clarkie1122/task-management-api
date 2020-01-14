import { IsNotEmpty, IsIn } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { TaskStatus } from '../task-status.enum';

@InputType()
export class CreateTaskDto {
  @Field(type => String)
  @IsNotEmpty()
  title: string;

  @Field(type => String)
  @IsNotEmpty()
  description: string;

  @Field(type => String)
  @IsNotEmpty()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;
}