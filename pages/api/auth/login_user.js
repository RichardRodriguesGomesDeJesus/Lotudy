import { connectMongo } from '../../../lib/connectMongo.js';
import jwt from 'jsonwebtoken';
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs';
import validator from 'validator';



export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ mse: 'Method Not Allowed' });
      }
      const { email, password } = req.body;
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
      if (!email) {
        return res.status(422).send({ mse: 'email is required' });
      }
      if (!password) {
        return res.status(422).send({ mse: 'password is required' });
      }
      try{
        await connectMongo();
        const users = await UserModel.find({ });
        const emails = users.map(user => user.email)
        const existEmail = emails.includes(email)
        if (existEmail === true) {
          const index = emails.indexOf(email)
          const passwordMatch = await bcrypt.compare(password, users[index].password);
          if (passwordMatch) {
            const token = jwt.sign({
              userId: users[index]._id,
              email: email
            }, process.env.SECRET)
            res.status(201).send({mse:'successful authentication', token});
          } else {
            res.status(401).send('Incorrect password or email')
          }
        } else {
          res.status(401).send('User not found');
        }
      } catch (error) {
        return res.status(500).send({ msg: 'An error occurred while processing the request',error:JSON.stringify(error)});
      }
}
