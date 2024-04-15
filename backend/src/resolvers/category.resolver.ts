import { Resolver, Arg, Query, Int } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { Category } from '../entities/category.entity';
import { Like } from 'typeorm';

@Resolver(Category)
class CategoriesResolver {
  @Query(() => [Category])
  async allCategories(@Arg('name', { nullable: true }) name: string) {
    const categories = await Category.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: 'desc' },
      relations: ['subCategories'], // Charge les sous-catégories
    });

    return categories.map((category) => {
      return {
        ...category,
        subCategoryIds: category.subCategories.map((subCategory) => subCategory.id),
      };
    });
  }

  @Query(() => Category)
  async categoryById(@Arg('categoryId', () => Int) id: number) {
    const category = await Category.findOneBy({ id });
    if (!category) {
      throw new GraphQLError('Not Found');
    }
    return category;
  }
}

export default CategoriesResolver;
