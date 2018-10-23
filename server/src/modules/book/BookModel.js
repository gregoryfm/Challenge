import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const BookSchema = new mongoose.Schema({
  _id: ObjectId,
  title: String,
  author: { type: ObjectId, ref: "Author" },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Book', BookSchema);
