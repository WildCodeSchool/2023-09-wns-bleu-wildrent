import { DataSource } from 'typeorm';
import { ProductRef } from './entities/productRef.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subcategory.entity';
import User from './entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '0') || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  entities: [User, SubCategory, Category, ProductRef],
  synchronize: true,
  logging: true,
});
