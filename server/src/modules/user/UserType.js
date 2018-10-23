import * as UserLoader from './UserLoader';

export const typeDefs = `
  type User {
    name: String
    email: String
    password: String
  }

  type UserAuth {
    name: String
    email: String
    authToken: String
  }
`;

export const resolvers = {};

export const mutations = {
  login: (root, args) => UserLoader.loadUser(root, args),
  createUser: (root, args) => UserLoader.createUser(root, args),
}
