import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');

export default mongoose;
