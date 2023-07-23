import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME,
  port: parseInt(process.env.RDS_PORT),
  database: process.env.RDS_DB_NAME,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  synchronize: true,
  logging: false,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
