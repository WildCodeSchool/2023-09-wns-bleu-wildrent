import { Resolver, Arg, Query, Int } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { SubCategory } from '../entities/subcategory.entity';

@Resolver(SubCategory)
class SubCategoryResolver {
  @Query(() => [SubCategory])
  async allSubCategories() {
    return await SubCategory.find({ order: { id: 'desc' } });
  }

  @Query(() => SubCategory)
  async subCategoryById(@Arg('subCategoryId', () => Int) id: number) {
    const subCategory = await SubCategory.findOneBy({ id });
    if (!subCategory) {
      throw new GraphQLError('Not Found');
    }
    return subCategory;
  }
}

export default SubCategoryResolver;
