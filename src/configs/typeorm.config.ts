// config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost', // Database host
  port: parseInt(process.env.DB_PORT, 10) || 3306, // Database port
  username: process.env.DB_USERNAME || 'root', // Database username
  password: process.env.DB_PASSWORD || '2002', // Database password
  database: process.env.DB_NAME || 'test', // Database name
  entities: [Auth], // Specify the entities here or use paths like 'dist/**/*.entity{.ts,.js}'
  synchronize: true, // Set to `false` in production to avoid unwanted schema changes
};
