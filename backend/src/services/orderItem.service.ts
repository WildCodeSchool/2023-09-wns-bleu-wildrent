import { Repository } from 'typeorm';
import db from '../db';
import { OrderItem } from '../entities/orderItem.entity';
export default class OrderItemService {
  db: Repository<OrderItem>;
  constructor() {
    this.db = db.getRepository(OrderItem);
  }
}
