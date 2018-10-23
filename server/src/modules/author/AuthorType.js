import * as AuthorLoader from './AuthorLoader';

export const typeDefs = `
  type Author {
    id: ID
    name: String
    age: Int
  }

  input AuthorInput {
    _id: String
  }
`;

export const resolvers = {
  authors: () => AuthorLoader.loadAllAuthors(),
  author: (root, args, context) => AuthorLoader.loadAuthor(root, args, context),
};

export const mutations = {
  createAuthor: (root, args, context) => AuthorLoader.createAuthor(root, args, context),
}
