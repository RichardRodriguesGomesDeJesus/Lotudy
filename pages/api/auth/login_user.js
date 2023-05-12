import { connectMongo } from '../../../lib/connectMongo.js';
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs';



export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ mse: 'Method Not Allowed' });
      }
      const { email, password } = req.body;
      await connectMongo();
      const users = await UserModel.find({ });
      const emails = users.map(user => user.email)
      const existEmail = emails.includes(email)
      if (existEmail === true) {
        const index = emails.indexOf(email)
        const passwordMatch = await bcrypt.compare(password, users[index].password);
        if (passwordMatch) {
          res.status(201).send('sucesso!');
        } else {
          res.status(401).send('senha ou email  incorretos')
        }
      } else {
        res.status(401).send('senha ou email ');
      }
}
