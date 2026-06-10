import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
      authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  googleId: {
    type: String,
    default: null
  },

  avatar: {
    type: String,
    default: null
  },
   role: {
    type: String,
    enum: ['admin', 'responder', 'viewer'],
    default: 'viewer'
  },
   expertise: {
    type: [String],
    default: null,
    trim: true,
    lowercase: true
  },
  isAvailable: {
  type: Boolean,
  default: true
},
createdAt: {
  type: Date,
  default: Date.now
}
});

const UserModel = mongoose.model('user', userSchema);
export default UserModel;