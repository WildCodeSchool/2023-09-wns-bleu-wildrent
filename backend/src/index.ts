import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import CategoriesResolver from './resolvers/category.resolver';
import db from './db';

const port = Number(process.env.USE_PORT) || 4001;

buildSchema({
  resolvers: [CategoriesResolver],
}).then(async (schema) => {
  await db.initialize();

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`graphql server listening on ${url}`);
});
