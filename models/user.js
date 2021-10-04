import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  passwordHash: { type: String },
  passwordSalt: { type: String },
  group: { type: Number, default: 0 },
  avatar: { type: String, default: '' }
});

export default mongoose.model('User', UserSchema);
