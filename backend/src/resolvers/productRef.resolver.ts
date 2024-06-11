import { Resolver, Arg, Query, Int, Mutation, Authorized } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { InputProductRef, ProductRef, UpdateProductRef } from '../entities/productRef.entity';
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
    const productRef = await ProductRef.findOne({
      where: {
        id: id,
      },
      relations: {
        subCategory: true,
      },
    });
    if (!productRef) {
      throw new GraphQLError('Not Found');
    }
    return productRef;
  }
  @Authorized(['ADMIN'])
  @Mutation(() => Message)
  async addProductRef(@Arg('data') data: InputProductRef) {
    const alreadyRegistered = Boolean(
      await new ProductRefService().findProductRefByName(data.name),
    );
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        await new ProductRefService().createProductRef(data);
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

  @Authorized(['ADMIN'])
  @Mutation(() => Message)
  async updateProductRef(
    @Arg('productRefId', () => Int) id: number,
    @Arg('data') data: UpdateProductRef,
  ): Promise<Message> {
    try {
      const success = await this.productRefService.updateProductRef(id, data);
      if (success) {
        return { success: true, message: 'ProductRef updated Successfully!' };
      } else {
        return { success: false, message: 'Failed to update ProductRef' };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: (e as Error).message };
    }
  }
}

export default ProductRefsResolver;
