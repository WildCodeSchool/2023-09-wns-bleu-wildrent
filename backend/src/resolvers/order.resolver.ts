import { Resolver, Mutation, Arg, Query, Ctx, Int } from 'type-graphql';
import { Order, OrderInput } from '../entities/order.entity';
import { Message } from '../entities/user.entity';
import { GraphQLError } from 'graphql';
import { ContextType } from '../types';
import OrderService from '../services/order.service';

@Resolver()
class OrderResolver {
  private orderService = new OrderService();

  @Query(() => [Order])
  async allOrders(@Ctx() { currentUser }: ContextType): Promise<Order[]> {
    if (currentUser?.role === 'ADMIN') {
      const orders = await this.orderService.getAllOrders();
      if (!orders) {
        throw new GraphQLError('Not Found');
      }
      return orders;
    } else if (currentUser && currentUser.id) {
      const orders = await this.orderService.getOrdersByUserId(currentUser.id);
      if (!orders) {
        throw new GraphQLError('Not Found');
      }
      return orders;
    } else {
      throw new GraphQLError('Unauthorized');
    }
  }

  @Query(() => Order)
  async orderById(
    @Arg('orderId', () => Int) id: number,
    @Ctx() { currentUser }: ContextType,
  ): Promise<Order> {
    const order = await this.orderService.findOrderById(id);
    if (!order) {
      throw new GraphQLError('Not Found');
    }
    if (currentUser?.role !== 'ADMIN' && order.user.id !== currentUser?.id) {
      throw new GraphQLError('Unauthorized');
    }
    return order;
  }

  @Mutation(() => Message)
  async createOrder(@Arg('data') data: OrderInput) {
    try {
      const success = await new OrderService().addOrder(data);
      if (success) {
        return { success: true, message: 'order Created !' };
      } else {
        return { success: false, message: 'Failed to create order' };
      }
    } catch (error) {
      console.error((error as Error).message);
      return { success: false, message: (error as Error).message };
    }
  }
}

export default OrderResolver;
