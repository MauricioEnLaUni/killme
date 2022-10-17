import { Schema, model, Document } from 'mongoose';
import argon2 from 'argon2';

export interface IUser extends Document{
  username: string;
  email: string;
  password: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.encryptPassword =
    async (password: string): Promise<string> => {
  const hash = await argon2.hash(password);
  return hash;
};

userSchema.methods.validatePassword =
    async function (password: string): Promise<boolean> {
  return await argon2.verify(this.password, password);
}

export default model<IUser>('User', userSchema);