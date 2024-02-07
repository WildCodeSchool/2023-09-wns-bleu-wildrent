import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import env from './env';
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = env;

export default new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [Category],
  synchronize: true,
  logging: env.NODE_ENV !== 'test',
});
