import { Resolver, Arg, Query, Int, Mutation, Authorized } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { InputProductRef, ProductRef, UpdateProductRef } from '../entities/productRef.entity';
import { Message } from '../entities/user.entity';
import ProductRefService from '../services/productRef.service';
import { AvailableProducts } from '../entities/productItem.entity';
import { In } from 'typeorm';
import db from '../db';
import { Order } from '../entities/order.entity';

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

  @Query(() => AvailableProducts)
  async getProductAvailableByDateRange(
    @Arg('startDate', () => String, { nullable: true }) startDate: string | null,
    @Arg('endDate', () => String, { nullable: true }) endDate: string | null,
  ): Promise<AvailableProducts> {
    try {
      const allProductRefs = await this.productRefService.getAllProductRefs();
      if (!startDate && !endDate) {
        return {
          items: allProductRefs,
        };
      } else if (startDate && endDate) {
        // Recuperer les items de toutes les order sur une plage de date
        const allOrderByDateRange = await db
          .getRepository(Order)
          .createQueryBuilder('order')
          .leftJoinAndSelect('order.items', 'orderItem')
          .leftJoinAndSelect('orderItem.productRef', 'productRef')
          .where(
            '(order.startDate BETWEEN :startDate AND :endDate OR order.endDate BETWEEN :startDate AND :endDate)',
            { startDate: new Date(startDate), endDate: new Date(endDate) },
          )
          .orWhere('(order.startDate <= :startDate AND order.endDate >= :endDate)', {
            startDate,
            endDate,
          })
          .getMany();

        // Associer les quantités commandés au productRef.id
        const allProductsOrdered = allOrderByDateRange
          .flatMap((order) => order.items)
          .map(({ id, quantity, productRef }) => ({ productId: id, quantity, productRef }));

        // Map des quantités avec le productRef.id en tant que key
        const quantitiesMap: { [id: number]: number } = {};

        for (const product of allProductsOrdered) {
          const { quantity, productRef } = product;
          const { id } = productRef;

          // Vérifier si l'id existe déjà dans quantitiesMap
          if (quantitiesMap[id]) {
            // Ajouter la quantité à l'id existant
            quantitiesMap[id] += quantity;
          } else {
            // Initialiser la quantité pour cet id
            quantitiesMap[id] = quantity;
          }
        }

        // Convertir la map en un array
        const aggregatedQuantities = Object.keys(quantitiesMap).map((id) => ({
          id: Number(id),
          quantity: quantitiesMap[Number(id)],
        }));

        // Recuperer les productRef avec des quantité dispo et available
        const productRefs = await ProductRef.find({
          where: {
            id: In(aggregatedQuantities.map(({ id }) => id)),
          },
        });

        const items: ProductRef[] = [];

        // Mise à jour des quantités en retirant les produits commandés
        for (let i = 0; i < aggregatedQuantities.length; i++) {
          const { id, quantity } = aggregatedQuantities[i];
          const productRef = productRefs.find((pr) => pr.id === id);
          if (productRef) {
            productRef.quantityAvailable -= quantity;
          }
          items.push(productRef as ProductRef);
        }

        // Retourne tout les produits sans les produits non disponible
        const result = allProductRefs.filter(
          ({ id }) =>
            !items
              .filter((item) => item.quantityAvailable < 1)
              .map((item) => item.id)
              .includes(id),
        );
        return {
          items: result,
        };
      } else {
        throw new Error('Both startDate and endDate must be provided together');
      }
    } catch (e) {
      throw new GraphQLError((e as Error).message);
    }
  }
}

export default ProductRefsResolver;
