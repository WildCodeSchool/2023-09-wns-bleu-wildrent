import { Resolver, Arg, Query, Int, Mutation } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { InputProductRef, ProductRef } from '../entities/productRef.entity';
import { Message } from '../entities/user.entity';
import ProductRefService from '../services/productRef.service';

@Resolver(ProductRef)
class ProductRefsResolver {
  @Query(() => [ProductRef])
  async allProductRefs() {
    return await ProductRef.find({ order: { id: 'desc' } });
  }

  @Query(() => ProductRef)
  async productRefById(@Arg('productRefId', () => Int) id: number) {
    const productRef = await ProductRef.findOneBy({ id });
    if (!productRef) {
      throw new GraphQLError('Not Found');
    }
    return productRef;
  }

  @Mutation(() => Message)
  async addProductRef(@Arg('newProductRef') newUser: InputProductRef) {
    const alreadyRegistered = Boolean(
      await new ProductRefService().findProductRefByName(ProductRef.name),
    );
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        await new ProductRefService().createProductRef(newUser);
        return { success: true, message: 'Account Created !' };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }
}

export default ProductRefsResolver;
