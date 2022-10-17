import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  // Crea un usuario con la interfaz del modelo
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();
  // token
  const token: string =
      jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'why', {
        expiresIn: 60 * 60 * 24
      });

  res.header('auth-token', token).json(savedUser);
};

export const signIn = async (req: Request, res: Response) => {
  // Validate User
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json('Email or password wrong');
  // Validate password
  const passwordMatch: boolean =
      await user.validatePassword(req.body.password);
  if (!passwordMatch) return res.status(400).json('Invalid Password');
  // If validation create log in token
  const token: string =
      jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'why', {
    expiresIn: 60 * 60 * 24
  });

  res.header('auth-token', token).json(user);
};

export const profile = (req: Request, res: Response) => {
  res.send('SignUp');
};