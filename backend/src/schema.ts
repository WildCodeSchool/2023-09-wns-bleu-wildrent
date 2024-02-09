import { buildSchema } from 'type-graphql';
import CategoriesResolver from './resolvers/category.resolver';

// import { authChecker } from './auth';

export default buildSchema({
  resolvers: [CategoriesResolver],
  //   authChecker,
});
