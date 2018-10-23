import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const AuthorSchema = new mongoose.Schema({
  _id: ObjectId,
  name: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Author', AuthorSchema);
