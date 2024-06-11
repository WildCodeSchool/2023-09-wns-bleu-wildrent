import { Resolver } from 'type-graphql';
import OrderItemService from '../services/orderItem.service';
import { OrderItem } from '../entities/orderItem.entity';

@Resolver(OrderItem)
class OrderItemResolver {
  private orderItemService = new OrderItemService();
}
export default OrderItemResolver;
