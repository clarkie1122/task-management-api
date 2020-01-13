import { Field, Int, ObjectType, InputType } from 'type-graphql';

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
}