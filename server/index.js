import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import mongoose from './src/config/database';

import * as UserType from './src/modules/user/UserType';
import * as BookType from './src/modules/book/BookType';
import * as AuthorType from './src/modules/author/AuthorType';

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    books: [Book]
    authors: [Author]
    author(_id: String): Author
    user(email: String): User
    login(
      email: String!
      password: String!
    ): UserAuth
  }

  type UserAuth {
    name: String
    email: String
    authToken: String
  }

  type Mutation {
    createAuthor(
      name: String!
      age: Int
    ): Author

    createUser(
      name: String!
      email: String!
      password: String!
    ): User
  }
`;

const typeDefs = [
  BookType.typeDefs,
  AuthorType.typeDefs,
  UserType.typeDefs,
];

const resolvers = {
  Query: {
    ...UserType.resolvers,
    ...BookType.resolvers,
    ...AuthorType.resolvers
  },
  Mutation: {
    ...UserType.mutations,
    ...AuthorType.mutations
  }
};

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
