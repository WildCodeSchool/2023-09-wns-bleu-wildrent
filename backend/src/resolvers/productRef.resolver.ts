import { Resolver, Arg, Query, Int, Mutation, Authorized } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { InputProductRef, ProductRef } from '../entities/productRef.entity';
import { Message } from '../entities/user.entity';
import ProductRefService from '../services/productRef.service';

@Resolver(ProductRef)
class ProductRefsResolver {
  private productRefService = new ProductRefService();
  @Query(() => [ProductRef])
  async allProductRefs() {
    return await this.productRefService.getAllProductRefs();
  }

  @Query(() => ProductRef)
  async productRefById(@Arg('productRefId', () => Int) id: number) {
    const productRef = await ProductRef.findOneBy({ id });
    if (!productRef) {
      throw new GraphQLError('Not Found');
    }
    return productRef;
  }
  @Authorized(['ADMIN'])
  @Mutation(() => Message)
  async addProductRef(@Arg('newProductRef') newProductRef: InputProductRef) {
    const alreadyRegistered = Boolean(
      await new ProductRefService().findProductRefByName(newProductRef.name),
    );
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        await new ProductRefService().createProductRef(newProductRef);
        return { success: true, message: 'ProductRef Created !' };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }

  @Authorized(['ADMIN'])
  @Mutation(() => Message)
  async deleteProductRef(@Arg('productRefId', () => Int) id: number): Promise<Message> {
    try {
      const success = await this.productRefService.deleteProductRef(id);
      if (success) {
        return { success: true, message: 'ProductRef Deleted Successfully!' };
      } else {
        return { success: false, message: 'Failed to delete ProductRef' };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  }
}

export default ProductRefsResolver;
