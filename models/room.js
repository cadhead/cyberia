import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RoomSchema = new Schema({
  uniqName: { type: String, unique: true },
  title: { type: String },
  isPrivate: { type: Boolean },
  owner: { type: String },
  ranks: {
    user: {
      members: [{ type: String }],
      rankName: { type: String, default: 'User' }
    },
    moder: {
      members: [{ type: String }],
      rankName: { type: String, default: 'Moder' }
    },
    admin: {
      members: [{ type: String }],
      rankName: { type: String, default: 'Admin' }
    },
    owner: {
      members: [{ type: String }],
      rankName: { type: String, default: 'Owner' }
    }
  }
});

export default mongoose.model('Room', RoomSchema);
