import { Resolver, Arg, Query, Int, Mutation, Authorized } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { InputProductRef, ProductRef, UpdateProductRef } from '../entities/productRef.entity';
import { Message } from '../entities/user.entity';
import ProductRefService from '../services/productRef.service';
import { Repository } from 'typeorm';

@Resolver(ProductRef)
class ProductRefsResolver {
  db: Repository<ProductRef>;

  private productRefService = new ProductRefService();
  @Query(() => [ProductRef])
  async allProductRefs(
    @Arg('startDate', () => String, { nullable: true }) startDate?: string,
    @Arg('endDate', () => String, { nullable: true }) endDate?: string,
    @Arg('name', { nullable: true }) name?: string,
  ) {
    const productRefs = await this.productRefService.getAllProductRefs(name);

    const availableProducts = await this.productRefService.getAvailableProducts(startDate, endDate);

    return productRefs.map((productRef) => {
      const productAvailability = availableProducts.find((p) => p.id === productRef.id);
      if (productAvailability) {
        productRef.quantityAvailable = productAvailability.quantityAvailable;
      }
      return productRef;
    });
  }

  @Query(() => ProductRef)
  async productRefById(
    @Arg('productRefId', () => Int) id: number,
    @Arg('startDate', () => String, { nullable: true }) startDate?: string,
    @Arg('endDate', () => String, { nullable: true }) endDate?: string,
  ) {
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

    const availableProducts = await this.productRefService.getAvailableProducts(startDate, endDate);
    const productAvailability = availableProducts.find((p) => p.id === id);

    if (productAvailability) {
      productRef.quantityAvailable = productAvailability.quantityAvailable;
    } else {
      productRef.quantityAvailable = 0;
    }

    return productRef;
  }

  @Query(() => [ProductRef])
  async getProductsBySubCategoryId(@Arg('subCategoryId', () => Int) subCategoryId: number) {
    return await this.productRefService.getProductsBySubCategoryId(subCategoryId);
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
        const success = await new ProductRefService().createProductRef(data);
        if (success) {
          return { success: true, message: 'ProductRef Created !' };
        } else {
          return { success: false, message: 'Failed to create productRef' };
        }
      } catch (error) {
        console.error((error as Error).message);
        return { success: false, message: (error as Error).message };
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
