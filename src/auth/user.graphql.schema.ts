import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { TaskDto } from 'src/tasks/task.graphql.schema';

@ObjectType()
@InputType('user')
export class User {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  username: string;

  @Field(type => String)
  password: string;

  @Field(type => String)
  salt: string;

  @Field(type => [TaskDto])
  tasks: TaskDto[];
}