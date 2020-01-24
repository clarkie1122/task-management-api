import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        return {
          req
        }
      }
    }),
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ]
})
export class AppModule {}
