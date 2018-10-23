import * as BookLoader from './BookLoader';

export const typeDefs = `
  type Book {
    id: ID
    title: String!
    author: Author
  }
`;

export const resolvers = {
  books: (root, args) => BookLoader.loadAllBooks(root, args),
};

export const mutations = {
  createBook: (root, args) => BookLoader.createBook(root, args),
}
