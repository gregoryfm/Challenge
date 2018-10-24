import BookModel from './BookModel';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const createBook = async (root, { title, author }) => {
  const _id = new ObjectId();
  let book = new BookModel({ _id, title, author });
  return await book.save();
}

export const loadAllBooks = async (root, { skip = 0, limit = 4 }) => {
  return await BookModel
    .find()
    .skip(skip)
    .limit(limit)
    .populate("author");
}
