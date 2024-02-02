import { DataSource } from 'typeorm';
import { ProductRef } from './entities/productRef.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subcategory.entity';
import User from './entities/user.entity';

let databaseUrl: string | undefined;

if (process.env.NODE_ENV) {
  databaseUrl = process.env.DATABASE_URL;
} else {
  databaseUrl = process.env.DEV_DATABASE_URL;
}

export default new DataSource({
  type: 'postgres',
  host: databaseUrl || 'db',
  port: parseInt(process.env.DB_PORT || '0') || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  entities: [User, SubCategory, Category, ProductRef],
  synchronize: true,
  logging: true,
});
