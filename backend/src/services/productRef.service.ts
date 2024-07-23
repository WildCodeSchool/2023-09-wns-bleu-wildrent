import { ILike, Repository } from 'typeorm';
import db from '../db';
import { InputProductRef, ProductRef, UpdateProductRef } from '../entities/productRef.entity';
import SubCategoryService from './subCategory.service';
import { ProductItem } from '../entities/productItem.entity';
import ProductItemService from './productItem.service';
import OrderService from './order.service';

export default class ProductRefService {
  db: Repository<ProductRef>;
  productItemService: ProductItemService;
  orderService: OrderService;
  constructor() {
    this.db = db.getRepository(ProductRef);
    this.productItemService = new ProductItemService();
    this.orderService = new OrderService();
  }
  async findProductRefById(id: number) {
    try {
      return await this.db.findOneBy({ id });
    } catch (e) {
      console.error((e as Error).message);
      throw new Error('Failed to find ProductRef');
    }
  }

  async findProductRefByName(name: string) {
    try {
      return await this.db.findOneBy({ name });
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async getProductsBySubCategoryId(subCategoryId: number) {
    try {
      return await this.db
        .createQueryBuilder('productRef')
        .leftJoinAndSelect('productRef.subCategory', 'subCategory')
        .where('subCategory.id = :subCategoryId', { subCategoryId })
        .getMany();
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async getAllProductRefs(name?: string) {
    return await this.db.find({
      order: { quantityAvailable: 'desc' },
      relations: ['subCategory', 'productItems'],
      where: { name: name ? ILike(`%${name}%`) : undefined },
    });
  }

  async deleteProductRef(id: number): Promise<boolean> {
    try {
      const productRef = await this.db.findOneBy({ id });
      if (!productRef) {
        console.error('ProductRef not found!');
        return false;
      }
      if (productRef.productItems) {
        for (const item of productRef.productItems) {
          await this.productItemService.deleteProductItem(item.id);
        }
      }
      await this.db.remove(productRef);
      return true;
    } catch (e) {
      console.error('Error deleting productRef:', e);
      return false;
    }
  }

  async updateProductRef(id: number, data: UpdateProductRef): Promise<boolean> {
    try {
      const productRefToUpdate = await this.db.findOneBy({ id });

      if (!productRefToUpdate) {
        console.error('ProductRef not found!');
        return false;
      }

      if (typeof data?.quantity === 'number' && data.quantity > productRefToUpdate.quantity) {
        const productItems = Array.from(
          { length: data.quantity - productRefToUpdate.quantity },
          () => new ProductItem(),
        );
        productItems.forEach((pi) => productRefToUpdate.productItems.push(pi));
      }
      // Mise à jour des champs de productRefToUpdate avec ceux de data
      Object.assign(productRefToUpdate, data);

      await productRefToUpdate.save();

      return true;
    } catch (e) {
      console.error('Error updating productRef:', e);
      return false;
    }
  }

  async createProductRef(data: InputProductRef) {
    try {
      const subCategory = await new SubCategoryService().findSubCategoryById(data.subCategory.id);
      if (!subCategory) {
        console.error('subCategory not found!');
        return null;
      }
      const newProductRef = this.db.create(data);
      await this.db.save(newProductRef);

      const productItems = Array.from({ length: data.quantity }, () => {
        const productItem = new ProductItem();
        productItem.productRef = newProductRef;
        return productItem;
      });

      await Promise.all(productItems.map((item) => item.save()));

      newProductRef.recalculateQuantity();
      newProductRef.recalculateQuantityAvailable();
      await this.db.save(newProductRef);

      return newProductRef;
    } catch (e) {
      console.error((e as Error).message);
      throw new Error('Failed to create productRef');
    }
  }

  async getAvailableProducts(startDate?: string, endDate?: string): Promise<ProductRef[]> {
    console.log('🚀 ~ ProductRefService ~ getAvailableProducts ~ startDate:', startDate);
    // Fetch total quantities
    const totalQuantities = await this.db
      .createQueryBuilder('product_ref')
      .select('product_ref.id', 'product_ref_id')
      .addSelect('product_ref.name', 'name')
      .addSelect('COUNT(product_item.id)', 'total_quantity')
      .innerJoin('product_ref.productItems', 'product_item')
      .groupBy('product_ref.id')
      .getRawMany();

    // If no dates are provided, return totalQuantities
    if (!startDate || !endDate) {
      return totalQuantities.map((totalQuantity) => {
        const productRef = new ProductRef();
        productRef.id = totalQuantity.product_ref_id;
        productRef.name = totalQuantity.name;
        productRef.quantityAvailable = totalQuantity.total_quantity;
        return productRef;
      });
    }

    // Fetch ordered quantities within the date range with overlap
    const orderedQuantities = await this.orderService.db
      .createQueryBuilder('order')
      .select('product_ref.id', 'product_ref_id')
      .addSelect('COUNT(product_ref.name)', 'ordered_quantity')
      .innerJoin('order.orderItems', 'order_item')
      .leftJoin('order_item.productItems', 'product_item')
      .leftJoin('product_item.productRef', 'product_ref')
      .where(
        'order.startDate BETWEEN :startDate AND :endDate OR order.endDate BETWEEN :startDate AND :endDate',
        { startDate, endDate },
      )
      .orWhere('(order.startDate <= :startDate AND order.endDate >= :endDate)', {
        startDate,
        endDate,
      })
      .groupBy('product_ref.id')
      .getRawMany();

    const orderedQuantitiesMap = new Map(
      orderedQuantities.map((item) => [item.product_ref_id, item.ordered_quantity]),
    );

    return totalQuantities.map((totalQuantity) => {
      const orderedQuantity = orderedQuantitiesMap.get(totalQuantity.product_ref_id) || 0;
      const productRef = new ProductRef();
      productRef.id = totalQuantity.product_ref_id;
      productRef.name = totalQuantity.name;
      productRef.quantityAvailable = totalQuantity.total_quantity - orderedQuantity;
      return productRef;
    });
  }
}
