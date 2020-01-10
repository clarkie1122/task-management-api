import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { User } from './user.graphql.schema';

@InputType()
export class CreateTaskInput {
  @Field(type => String)
  title: string;

  @Field(type => String)
  description: string;

  @Field(type => String)
  status: TaskStatus;
}