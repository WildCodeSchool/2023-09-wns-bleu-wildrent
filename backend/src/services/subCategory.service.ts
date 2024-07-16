import { Repository } from 'typeorm';
import db from '../db';
import { SubCategory } from '../entities/subcategory.entity';
import { Category } from '../entities/category.entity';
import { DeleteResult } from 'typeorm'; // Assurez-vous que cette entité est correctement importée

export default class SubCategoryService {
  private db: Repository<SubCategory>;
  private categoryRepository: Repository<Category>; // Ajout pour gérer la relation avec les catégories

  constructor() {
    this.db = db.getRepository(SubCategory);
    this.categoryRepository = db.getRepository(Category); // Initialisation du repository de catégories
  }

  // Récupère toutes les sous-catégories avec leur catégorie parente
  async getAllSubCategories() {
    return await this.db.find({
      order: { id: 'DESC' }, // Gardez la casse consistante, 'DESC' comme dans SQL
      relations: ['category'], // Assurez-vous que 'category' est le bon nom de la relation dans votre entité SubCategory
    });
  }

  // Trouve une sous-catégorie par son ID
  async findSubCategoryById(id: number) {
    return await this.db.findOneBy({ id });
  }

  // Crée une nouvelle sous-catégorie
  async createSubCategory({
    name,
    description,
    image,
    categoryId,
  }: {
    name: string;
    description: string;
    image: string;
    categoryId: number;
  }) {
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error('Category not found');
    }

    const subCategory = this.db.create({
      name,
      description,
      image,
      category, // Directement passer l'instance de Category
    });
    return await this.db.save(subCategory);
  }

  // Met à jour une sous-catégorie existante
  async updateSubCategory({
    id,
    name,
    description,
    image,
    categoryId,
  }: {
    id: number;
    name: string;
    description: string;
    image: string;
    categoryId?: number; // Rendre facultatif pour permettre les mises à jour sans changement de catégorie
  }) {
    const subCategory = await this.db.findOneBy({ id });
    if (!subCategory) {
      throw new Error('SubCategory not found');
    }

    subCategory.name = name;
    subCategory.description = description;
    subCategory.image = image;

    if (categoryId !== undefined) {
      // Vérification explicite de undefined pour permettre l'effacement avec null
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (!category) {
        throw new Error('Category not found');
      }
      subCategory.category = category;
    }

    return await this.db.save(subCategory);
  }

  // Supprime une sous-catégorie
  async deleteSubCategory(id: number): Promise<boolean> {
    const deleteResult: DeleteResult = await this.db.delete(id);

    // Vérifiez si 'affected' est défini et est supérieur à zéro
    if (
      deleteResult.affected === null ||
      deleteResult.affected === undefined ||
      deleteResult.affected === 0
    ) {
      throw new Error('No subCategory found to delete or error in deletion process.');
    }

    return true; // Si 'affected' est positif, la suppression a réussi
  }

  async getSubCategoriesByCategoryId(categoryId: number) {
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error('Category not found');
    }

    return await this.db.find({
      where: {
        category,
      },
      order: { id: 'DESC' },
      relations: ['category'],
    });
  }
}
