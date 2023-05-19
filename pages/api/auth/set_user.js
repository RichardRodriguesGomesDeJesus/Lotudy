import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs';
import validator from 'validator';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ mse: 'Method Not Allowed' });
  }
  
  const { name, email, password } = req.body;
  if (!validator.isLength(name, { min: 2 })) {
    return res.status(422).send({ mse: 'The name must be at least 2 characters long' });
  }
  if (!validator.isEmail(email)) {
    return res.status(422).send({ mse: 'The email provided is invalid' });
  }
  if (!validator.isStrongPassword(password, {
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    return res.status(422).send({ mse: 'Password must be at least 8 characters long, including uppercase and lowercase letters, numbers and symbols' });
  }
  if (!name) {
    return res.status(422).send({ mse: 'name is required' });
  }
  if (!email) {
    return res.status(422).send({ mse: 'email is required' });
  }
  if (!password) {
    return res.status(422).send({ mse: 'password is required' });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const userObject ={
      name: name, 
      email: email,
      password: hashPassword
    }
    await connectMongo();
    const users = await UserModel.find({ });
    const emails = users.map(user => user.email)
    const existEmail = emails.includes(email)
    if (existEmail === false) {
      const newUser = new UserModel(userObject);
      try {
        await newUser.save();
        const secret = process.env.SECRET
        const token = jwt.sign({
          userId: newUser._id,
          email: email
        },secret)
        res.status(201).send({mse: 'sucesso!',token});
      } catch {
        res.status(500).send({ mse: 'Something went wrong' })
      }
    } else {
      res.status(409).send('Esse email já foi cadastrado');
    }
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    return res.status(400).send({ mse: 'Something went wrong' });
  }
  finally {
    await mongoose.connection.close();
  }
}
