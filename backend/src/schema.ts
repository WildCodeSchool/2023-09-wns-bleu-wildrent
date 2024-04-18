import { buildSchema } from 'type-graphql';
import CategoriesResolver from './resolvers/category.resolver';
import { authChecker } from './authChecker';
import ProductRefsResolver from './resolvers/productRef.resolver';
import UserResolver from './resolvers/user.resolver';
import SubCategoryResolver from './resolvers/subcategory.resolver';

export default buildSchema({
  resolvers: [CategoriesResolver, ProductRefsResolver, UserResolver, SubCategoryResolver],
  authChecker: authChecker,
});
