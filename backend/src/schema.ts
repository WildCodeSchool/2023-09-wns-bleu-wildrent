import UserResolver from './resolvers/user.resolver';
import SubCategoryResolver from './resolvers/subcategory.resolver';
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/category.resolver';
import { authChecker } from './authChecker';
import ProductRefsResolver from './resolvers/productRef.resolver';

export default buildSchema({
  resolvers: [CategoryResolver, ProductRefsResolver, UserResolver, SubCategoryResolver],
  authChecker: authChecker,
});
