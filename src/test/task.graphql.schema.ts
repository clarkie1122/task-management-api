import { Field, Int, ObjectType } from 'type-graphql';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { User } from './user.graphql.schema';

@ObjectType()
export class Task {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  description: string;

//   @Field(type => TaskStatus)
//   status: TaskStatus;

  @Field(type => User)
  user: User;
}