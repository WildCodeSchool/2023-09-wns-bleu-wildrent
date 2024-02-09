import { Resolver, Arg, Query, Int } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { Category } from '../entities/category.entity';

@Resolver(Category)
class CategoriesResolver {
  @Query(() => [Category])
  async categories() {
    return await Category.find({ order: { id: 'desc' } });
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
