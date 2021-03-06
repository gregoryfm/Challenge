import UserModel from './UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_KEY = "THIS-KEY-WILL-BE-CHANGED";

export const loadUser = async (root, { email, password }) => {
  const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
  const comparePasswords = bcrypt.compareSync(password, user.password);

  if (user && comparePasswords) {
    const authToken = jwt.sign({ ...user }, JWT_KEY);
    return { name: user.name, email: user.email, authToken };
  }

  return { email: '', name: '', authToken: '' }
}

export const createUser = async (root, { name, email, password }) => {
  let user = new UserModel({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 4)
  });

  return await user.save();
}
