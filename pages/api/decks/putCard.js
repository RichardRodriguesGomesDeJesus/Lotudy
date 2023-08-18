import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { DeckModel } from "../../../models/user.js"
export default async function deleteDecks(req, res) {
  try{
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token, title } = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }
    if (!title) {
      return res.status(403).send('Title is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    if (validator.isAlpha(title)== false || title.length > 30) {
      return res.status(422).send('title is invalid')
    }
    
    await connectMongo();

    await DeckModel.deleteOne({ author:decoded.userId, title: title});

   res.status(200).send({mse: 'Success'})
  } catch (error) {
    res.status(500).send({ mse: 'Something went wrong'});
  }
}