import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import env from './env';
import { SubCategory } from './entities/subcategory.entity';
import { ProductRef } from './entities/productRef.entity';
import User from './entities/user.entity';
import { ProductItem } from './entities/productItem.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = env;

const db = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [Category, SubCategory, ProductRef, User, ProductItem, Order, OrderItem],
  synchronize: true,
  logging: env.NODE_ENV !== 'test',
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(', ');
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
