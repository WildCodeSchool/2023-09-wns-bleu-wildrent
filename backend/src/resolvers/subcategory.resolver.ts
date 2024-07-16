import { Resolver, Query, Mutation, Arg, Int, Authorized } from 'type-graphql';
import { SubCategory } from '../entities/subcategory.entity';
import SubCategoryService from '../services/subCategory.service';

@Resolver(SubCategory)
export default class SubCategoryResolver {
  private subCategoryService = new SubCategoryService();

  @Query(() => [SubCategory])
  async allSubCategories() {
    return await this.subCategoryService.getAllSubCategories();
  }

  @Query(() => SubCategory, { nullable: true })
  async subCategoryById(@Arg('id', () => Int) id: number) {
    return await this.subCategoryService.findSubCategoryById(id);
  }
  @Authorized(['ADMIN'])
  @Mutation(() => SubCategory)
  async addSubCategory(
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('image') image: string,
    @Arg('categoryId', () => Int) categoryId: number,
  ) {
    return await this.subCategoryService.createSubCategory({
      name,
      description,
      image,
      categoryId,
    });
  }
  @Authorized(['ADMIN'])
  @Mutation(() => SubCategory)
  async updateSubCategory(
    @Arg('id', () => Int) id: number,
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('image') image: string,
    @Arg('categoryId', () => Int) categoryId: number,
  ) {
    return await this.subCategoryService.updateSubCategory({
      id,
      name,
      description,
      image,
      categoryId,
    });
  }
  @Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteSubCategory(@Arg('id', () => Int) id: number) {
    return await this.subCategoryService.deleteSubCategory(id);
  }
}
