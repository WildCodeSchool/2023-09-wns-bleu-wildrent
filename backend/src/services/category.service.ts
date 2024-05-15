import { Repository } from 'typeorm';
import db from '../db';
import { Category } from '../entities/category.entity';

export default class CategoryService {
  private db: Repository<Category>;

  constructor() {
    this.db = db.getRepository(Category);
  }

  async findCategoryById(id: number) {
    return await this.db.findOneBy({ id });
  }

  async createCategory({
    name,
    description,
    image,
  }: {
    name: string;
    description: string;
    image: string;
  }) {
    const category = this.db.create({ name, description, image });
    return await this.db.save(category);
  }

  async getAllCategories() {
    return await this.db.find({ order: { id: 'desc' }, relations: ['subCategories'] });
  }
}
