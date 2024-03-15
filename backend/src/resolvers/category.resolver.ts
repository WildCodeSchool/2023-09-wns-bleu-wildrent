import { Resolver, Arg, Query, Int, Mutation } from 'type-graphql';
import { Category } from '../entities/category.entity';

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return Category.find({ order: { id: 'DESC' } });
  }

  @Query(() => Category, { nullable: true })
  async categoryById(@Arg('id', () => Int) id: number): Promise<Category | undefined> {
    const category = await Category.findOneBy({ id });
    return category ?? undefined;
  }

  @Mutation(() => Category)
  async addCategory(
    @Arg('name') name: string,
    @Arg('description') description: string,
    @Arg('image') image: string,
  ): Promise<Category> {
    const category = Category.create({ name, description, image });
    await Category.save(category);
    return category;
  }

  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String, { nullable: true }) name: string,
    @Arg('description', () => String, { nullable: true }) description: string,
    @Arg('image', () => String, { nullable: true }) image: string,
  ): Promise<Category | null> {
    const category = await Category.findOneBy({ id });
    if (!category) {
      return null;
    }

    // Mettre à jour les champs fournis
    category.name = name ?? category.name;
    category.description = description ?? category.description;
    category.image = image ?? category.image;

    await Category.save(category);
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => Int) id: number): Promise<boolean> {
    const category = await Category.findOneBy({ id });
    if (!category) {
      return false;
    }

    await Category.remove(category);
    return true;
  }
}

export default CategoriesResolver;
