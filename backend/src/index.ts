import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import CategoriesResolver from './resolvers/category.resolver';
import db from './db';
import ProductRefsResolver from './resolvers/productRef.resolver';

const port = Number(process.env.SERVER_PORT) || 4001;

buildSchema({
  resolvers: [CategoriesResolver, ProductRefsResolver],
}).then(async (schema) => {
  await db.initialize();

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`graphql server listening on ${url}`);
});
