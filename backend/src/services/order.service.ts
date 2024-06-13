import { Repository } from 'typeorm';
import db from '../db';
import { Order } from '../entities/order.entity';
import OrderItemService from './orderItem.service';

export default class OrderService {
  db: Repository<Order>;
  orderItemService: OrderItemService;
  constructor() {
    this.db = db.getRepository(Order);
    this.orderItemService = new OrderItemService();
  }

  async findOrderById(id: number) {
    try {
      return await this.db.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          items: {
            productRef: true,
          },
        },
      });
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async getAllOrders() {
    return await this.db.find({
      order: { orderDate: 'desc' },
      relations: {
        user: true,
        items: {
          productRef: true,
        },
      },
    });
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return await this.db.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: { orderDate: 'desc' },
      relations: {
        user: true,
        items: {
          productRef: true,
        },
      },
    });
  }
}
