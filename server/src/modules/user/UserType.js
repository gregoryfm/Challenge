import * as UserLoader from './UserLoader';

export const typeDefs = `
  type User {
    name: String
    email: String
    password: String
  }
`;

export const resolvers = {
  login: (root, args) => UserLoader.loadUser(root, args),
};

export const mutations = {
  createUser: (root, args) => UserLoader.createUser(root, args),
}
