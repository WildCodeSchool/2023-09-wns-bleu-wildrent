import { Resolver, Arg, Query, Int, Ctx } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { Order } from '../entities/order.entity';
import OrderService from '../services/order.service';
import { ContextType } from '../types';

@Resolver(Order)
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
}

export default OrderResolver;
