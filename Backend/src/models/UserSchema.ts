import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "./IUser";

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  friends: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  popularityScore: {
    type: Number,
    default: 0,
  },
});

export const User = model<IUser>("User", UserSchema);
