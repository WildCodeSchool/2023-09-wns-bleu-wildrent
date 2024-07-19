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

  // @Query(() => [AvailableProduct])
  // async getAvailableProducts(
  //   @Arg('startDate') startDate: string,
  //   @Arg('endDate') endDate: string,
  // ): Promise<AvailableProduct[]> {
  //   const totalQuantities = await this.db
  //     .createQueryBuilder('product_ref')
  //     .select('product_ref.id', 'product_ref_id')
  //     .addSelect('product_ref.name', 'name')
  //     .addSelect('COUNT(product_item.id)', 'total_quantity')
  //     .innerJoin('product_ref.productItems', 'product_item')
  //     .groupBy('product_ref.id')
  //     .addGroupBy('product_ref.name')
  //     .getRawMany();

  //   const orderedQuantities = await orderRepo
  //     .createQueryBuilder('order')
  //     .select('product_ref.id', 'product_ref_id')
  //     .addSelect('SUM(order_item.quantity)', 'ordered_quantity')
  //     .innerJoin('order.orderItems', 'order_item')
  //     .leftJoin('order_item.productItems', 'product_item')
  //     .leftJoin('product_item.productRef', 'product_ref')
  //     .where('order.startDate >= :startDate AND order.endDate <= :endDate', { startDate, endDate })
  //     .groupBy('product_ref.id')
  //     .getRawMany();

  //   const orderedQuantitiesMap = new Map(
  //     orderedQuantities.map((item) => [item.product_ref_id, item.ordered_quantity]),
  //   );

  //   return totalQuantities.map((totalQuantity) => {
  //     const orderedQuantity = orderedQuantitiesMap.get(totalQuantity.product_ref_id) || 0;
  //     return {
  //       name: totalQuantity.name,
  //       available_quantity: totalQuantity.total_quantity - orderedQuantity,
  //     };
  //   });
  // }
}

export default ProductRefsResolver;
