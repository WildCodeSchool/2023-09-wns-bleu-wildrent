import { Repository } from 'typeorm';
import db from '../db';
import { InputProductRef, ProductRef } from '../entities/productRef.entity';
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
      console.log('productRef:', productRef?.productItems);
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

  async createProductRef({
    name,
    description,
    image,
    priceHT,
    subCategoryId,
    quantity,
  }: InputProductRef) {
    try {
      const subCategory = await new SubCategoryService().findSubCategoryById(subCategoryId);
      if (!subCategory) {
        console.error('subCategory not found!');
        return null;
      }
      const newProductRef = this.db.create({
        name,
        description,
        image,
        priceHT,
        subCategory,
        quantity,
      });
      await this.db.save(newProductRef); // Assurez-vous que newProductRef est persisté avec un ID.

      const productItems = Array.from({ length: quantity }, () => {
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
      throw new Error('Failed to create product reference');
    }
  }
}
