import { Field, Int, ObjectType } from 'type-graphql';
import { Task } from './task.graphql.schema';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  username: string;

  @Field(type => String)
  password: string;

  @Field(type => String)
  salt: string;

  @Field(type => [Task])
  tasks: Task;
}