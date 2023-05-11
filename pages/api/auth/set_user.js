import { connectMongo } from '../../../lib/connectMongo.js';
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ mse: 'Method Not Allowed' });
  }
  const { name, email, password } = req.body;
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
      await newUser.save();
      res.status(201).send('sucesso!');
    } else {
      res.status(409).send('Esse email já foi cadastrado');
    }
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    return res.status(400).send({ err: error.message, mse: 'Something went wrong' });
  }
}
