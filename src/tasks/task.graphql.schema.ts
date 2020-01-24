import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { UserDto, TaskStatus } from '@inteck/global-components';

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

  @Field(type => UserDto)
  user: UserDto;
}