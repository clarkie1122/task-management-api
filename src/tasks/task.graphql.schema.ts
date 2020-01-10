import { Field, Int, ObjectType } from 'type-graphql';
import { TaskStatus } from 'src/tasks/task-status.enum';

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