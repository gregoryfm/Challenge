import BookModel from './BookModel';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const createBook = async (root, { title, author }) => {
  const _id = new ObjectId();
  let book = new BookModel({ _id, title, author });
  return await book.save();
}

export const loadAllBooks = async (root, args) => {
  const result = await BookModel.find().populate("author");
  return result;
}
