import { Repository } from 'typeorm';
import db from '../db';
import { OrderItem, OrderItemInput } from '../entities/orderItem.entity';
export default class OrderItemService {
  db: Repository<OrderItem>;
  constructor() {
    this.db = db.getRepository(OrderItem);
  }

  async createOrderItem(data: OrderItemInput) {
    try {
      const newOrderItem = this.db.create(data);
      return await this.db.save(newOrderItem);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}
