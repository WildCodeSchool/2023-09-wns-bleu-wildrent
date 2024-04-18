import { Repository } from 'typeorm';
import db from '../db';
import { InputProductRef, ProductRef } from '../entities/productRef.entity';
import SubCategoryService from './subCategory.service';

export default class ProductRefService {
  db: Repository<ProductRef>;
  constructor() {
    this.db = db.getRepository(ProductRef);
  }

  async findProductRefByName(name: string) {
    try {
      return await this.db.findOneBy({ name });
    } catch (e) {
      console.error((e as Error).message);
    }
  }
  async createProductRef({ name, description, image, priceHT, subCategoryId }: InputProductRef) {
    try {
      const subCategory = await new SubCategoryService().findSubCategoryById(subCategoryId);
      if (!subCategory) {
        console.error('subCategory not found!');
        return null;
      }
      const newProductRef = this.db.create({ name, description, image, priceHT, subCategory });
      return await this.db.save(newProductRef);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}
