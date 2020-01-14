import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.graphql.schema';

@ObjectType()
@InputType('tasks')
export class TaskDto {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  description: string;

  @Field(type => String)
  status: TaskStatus;

  @Field(type => User)
  user: User;
}