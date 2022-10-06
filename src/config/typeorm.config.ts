import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres24',
  database: 'test',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
};
