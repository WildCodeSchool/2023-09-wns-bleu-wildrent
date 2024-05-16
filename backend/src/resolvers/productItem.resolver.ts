import { Resolver, Query, Authorized, Mutation, Arg, Int } from 'type-graphql';
import ProductItemService from '../services/productItem.service';
import { ProductItem } from '../entities/productItem.entity';
import { Message } from '../entities/user.entity';

@Resolver(ProductItem)
class ProductItemsResolver {
  private productItemService = new ProductItemService();
  @Query(() => [ProductItem])
  async allProductItems() {
    return await ProductItem.find({ order: { id: 'desc' }, relations: ['productRef'] });
  }

  @Authorized(['ADMIN'])
  @Mutation(() => Message)
  async deleteProductItem(@Arg('productItemId', () => Int) id: number): Promise<Message> {
    try {
      const success = await this.productItemService.deleteProductItem(id);
      if (success) {
        return { success: true, message: 'ProductItem Deleted Successfully!' };
      } else {
        return { success: false, message: 'Failed to delete ProductItem' };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  }
}
export default ProductItemsResolver;
