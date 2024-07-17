import { Resolver, Query, Mutation, Arg, Int, Authorized } from 'type-graphql';
import { Category } from '../entities/category.entity';
import CategoryService from '../services/category.service';

@Resolver(Category)
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Query(() => [Category])
  async allCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Query(() => Category, { nullable: true })
  async categoryById(@Arg('id', () => Int) id: number) {
    return await this.categoryService.findCategoryById(id);
  }
  @Authorized(['ADMIN'])
  @Mutation(() => Category)
  async addCategory(
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('image') image: string,
  ) {
    return await this.categoryService.createCategory({ name, description, image });
  }
  @Authorized(['ADMIN'])
  @Mutation(() => Category)
  async updateCategory(
    @Arg('id', () => Int) id: number,
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('image') image: string,
  ) {
    return await this.categoryService.updateCategory(id, { name, description, image });
  }
  @Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => Int) id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
