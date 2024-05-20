import { Repository } from 'typeorm';
import db from '../db';
import { InputProductRef, ProductRef, UpdateProductRef } from '../entities/productRef.entity';
import SubCategoryService from './subCategory.service';
import { ProductItem } from '../entities/productItem.entity';
import ProductItemService from './productItem.service';

export default class ProductRefService {
  db: Repository<ProductRef>;
  productItemService: ProductItemService;
  constructor() {
    this.db = db.getRepository(ProductRef);
    this.productItemService = new ProductItemService();
  }

  async findProductRefByName(name: string) {
    try {
      return await this.db.findOneBy({ name });
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async getAllProductRefs() {
    return await this.db.find({
      order: { id: 'desc' },
      relations: ['subCategory', 'productItems'],
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
      console.log(data);

      if (typeof data?.quantity === 'number' && data.quantity > productRefToUpdate.quantity) {
        const productItems = Array.from(
          { length: data.quantity - productRefToUpdate.quantity },
          () => {
            const productItem = new ProductItem();
            // productItem.productRef = productRefToUpdate;
            productItem.productRef = { id: productRefToUpdate.id } as ProductRef;
            return productItem;
          },
        );
        await Promise.all(productItems.map((item) => item.save()));
      }
      // Mise à jour des champs de productRefToUpdate avec ceux de data
      Object.assign(productRefToUpdate, data);

      await this.db.save(productRefToUpdate);

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
}
