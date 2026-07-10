import mongoose from "mongoose";
import { USER_ROLES } from "../constants/role.constants.js";
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
   role:{

    type:String,

    enum:Object.values(USER_ROLES),

    default:USER_ROLES.VIEWER,

},
   expertise: {
    type: [String],
    default: null,
    trim: true,
    lowercase: true
  },activeIncidents: {

    type: Number,

    default: 0,

},

isAvailable: {

    type: Boolean,

    default: true,

},
createdAt: {
  type: Date,
  default: Date.now
}
});

const UserModel = mongoose.model('user', userSchema);
export default UserModel;