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
  authors: (root, args) => AuthorLoader.loadAllAuthors(root, args),
  author: (root, args) => AuthorLoader.loadAuthor(root, args),
};

export const mutations = {
  createAuthor: (root, args) => AuthorLoader.createAuthor(root, args),
}
