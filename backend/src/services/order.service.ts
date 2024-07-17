import { Repository } from 'typeorm';
import db from '../db';
import { Order, OrderInput } from '../entities/order.entity';
import OrderItemService from './orderItem.service';
import User from '../entities/user.entity';
import { ProductItem } from '../entities/productItem.entity';
import { ProductRef } from '../entities/productRef.entity';
import { OrderItem } from '../entities/orderItem.entity';

export default class OrderService {
  db: Repository<Order>;
  userRepository: Repository<User>;
  productRefRepository: Repository<ProductRef>;
  productItemRepository: Repository<ProductItem>;
  orderItemService: OrderItemService;

  constructor() {
    this.db = db.getRepository(Order);
    this.userRepository = db.getRepository(User);
    this.productRefRepository = db.getRepository(ProductRef);
    this.productItemRepository = db.getRepository(ProductItem);
    this.orderItemService = new OrderItemService();
  }

  async findOrderById(id: number) {
    try {
      return await this.db.findOne({
        where: {
          id,
        },
        relations: [
          'user',
          'orderItems',
          'orderItems.productItems',
          'orderItems.productItems.productRef',
        ],
      });
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    return this.db.find({
      relations: [
        'user',
        'orderItems',
        'orderItems.productItems',
        'orderItems.productItems.productRef',
      ],
    });
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.db.find({
      where: { user: { id: userId } },
      relations: [
        'user',
        'orderItems',
        'orderItems.productItems',
        'orderItems.productItems.productRef',
      ],
    });
  }

  async addOrder(data: OrderInput): Promise<Order> {
    const order = new Order();
    const user = await this.userRepository.findOne({ where: { id: data.user.id } });
    if (!user) {
      throw new Error(`User with ID ${data.user.id} not found`);
    }
    order.user = user;

    if (!data.startDate || !data.endDate) {
      throw new Error('Start date and end date are required');
    }
    order.startDate = new Date(data.startDate);
    order.endDate = new Date(data.endDate);
    order.orderItems = [];

    for (const itemInput of data.orderItems) {
      const orderItem = new OrderItem();
      orderItem.quantity = itemInput.quantity;
      orderItem.unitPrice = itemInput.unitPrice;
      orderItem.productItems = [];

      const productRef = await this.productRefRepository.findOne({
        where: { id: itemInput.productRef.id },
      });
      if (!productRef) {
        throw new Error(`ProductRef with ID ${itemInput.productRef.id} not found`);
      }

      const availableProductItems = await this.productItemRepository
        .createQueryBuilder('productItem')
        .where('productItem.productRefId = :productRefId', {
          productRefId: itemInput.productRef.id,
        })
        .andWhere('productItem.availability = :availability', { availability: 'available' })
        .limit(itemInput.quantity)
        .getMany();

      if (availableProductItems.length < itemInput.quantity) {
        throw new Error(`Not enough items available for ProductRef ID ${itemInput.productRef}`);
      }

      orderItem.productItems = availableProductItems;
      order.orderItems.push(orderItem);
    }

    await this.db.save(order);
    return order;
  }
}
