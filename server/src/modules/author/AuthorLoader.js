import AuthorModel from './AuthorModel';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const loadAuthor = async (root, { name }) => {
  const result = await AuthorModel.findOne({ name });
  if (result)
    return result;
  return { name: '' };
}

export const createAuthor = async (root, { name, age }) => {
  const _id = new ObjectId();
  let author = new AuthorModel({ _id, name: name.trim(), age });
  return await author.save();
}

export const loadAllAuthors = async (root, { skip = 0, limit = 4 }) => {
  return await AuthorModel
    .find()
    .skip(skip)
    .limit(limit);
}
