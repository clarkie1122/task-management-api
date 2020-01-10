import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { User } from './user.graphql.schema';

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