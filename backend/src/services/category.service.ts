import { Repository } from 'typeorm';
import db from '../db';
import { Category } from '../entities/category.entity';

export default class CategoryService {
  private db: Repository<Category>;

  constructor() {
    this.db = db.getRepository(Category);
  }

  // Récupère toutes les catégories avec tri et sous-catégories
  async getAllCategories() {
    return await this.db.find({ order: { id: 'desc' }, relations: ['subCategories'] });
  }

  // Trouve une catégorie par son ID
  async findCategoryById(id: number) {
    return await this.db.findOneBy({ id });
  }

  // Crée une nouvelle catégorie
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

  // Met à jour une catégorie existante
  async updateCategory(
    id: number,
    categoryData: { name: string; description?: string; image: string },
  ) {
    const category = await this.db.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    // Mettre à jour les champs de la catégorie avec les nouvelles valeurs
    Object.assign(category, categoryData);
    await this.db.save(category);
    return category;
  }

  // Supprime une catégorie
  async deleteCategory(id: number) {
    const result = await this.db.delete(id);
    if (result.affected !== null && result.affected !== undefined && result.affected === 0) {
      throw new Error('No category found to delete');
    }
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
  }
}
