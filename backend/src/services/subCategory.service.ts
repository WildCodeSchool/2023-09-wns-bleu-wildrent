import { Repository } from 'typeorm';
import db from '../db';
import { SubCategory } from '../entities/subcategory.entity';

export default class SubCategoryService {
  db: Repository<SubCategory>;
  constructor() {
    this.db = db.getRepository(SubCategory);
  }

  async findSubCategoryById(id: number) {
    try {
      return await this.db.findOneBy({ id });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }
}
