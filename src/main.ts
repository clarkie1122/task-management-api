import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  // get server config from yml
  const serverConfig = config.get('server');
  
  const app = await NestFactory.create(AppModule);
  app.listen(3000);
}
bootstrap();
