import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb'; // Use ObjectId from mongodb

export interface IUser extends Document {
  _id: ObjectId; // Explicitly define _id as ObjectId
  name: string;
  email: string;
  password: string;
  role: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Define schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<IUser>('User', userSchema);
export default User;
