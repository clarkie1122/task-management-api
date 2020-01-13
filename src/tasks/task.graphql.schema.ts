import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { TaskStatus } from './task-status.enum';

@ObjectType()
export class TaskDto {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  description: string;

  @Field(type => String)
  status: TaskStatus;
}