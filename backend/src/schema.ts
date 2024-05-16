import { CategoryResolver } from './resolvers/category.resolver';
import ProductItemsResolver from './resolvers/productItem.resolver';
import ProductRefsResolver from './resolvers/productRef.resolver';
import SubCategoryResolver from './resolvers/subcategory.resolver';
import UserResolver from './resolvers/user.resolver';
import { buildSchema } from 'type-graphql';
import { authChecker } from './authChecker';

export default buildSchema({
  resolvers: [
    CategoryResolver,
    ProductRefsResolver,
    UserResolver,
    SubCategoryResolver,
    ProductItemsResolver,
  ],
  authChecker: authChecker,
});
