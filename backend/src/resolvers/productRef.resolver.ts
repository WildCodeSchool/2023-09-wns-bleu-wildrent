import { Resolver, Arg, Query, Int } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { ProductRef } from '../entities/productRef.entity';

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
}

export default ProductRefsResolver;
