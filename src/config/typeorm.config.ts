import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { TaskEntity, UserEntity } from '@inteck/global-components'

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [TaskEntity, UserEntity],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize
}
