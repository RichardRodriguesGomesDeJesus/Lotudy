
import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { DeckModel } from '../../../models/user.jsx';
import type { Deck } from '../../../models/user.jsx';


export default async function putCards(req,res) {
  try{
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token  , cards} = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }

    if (!cards) {
      return res.status(403).send('Cards is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    await connectMongo();

    const deck = await DeckModel.find({ author: decoded.userId }) as Deck[];


    if (!deck) {
      return res.status(400).send({ mse: 'Deck not found' });
    }

    const userDeck = deck[0]

    userDeck.cards = cards 

    await userDeck.save();

    return res.status(200).send({mse:'card added to deck successfully'})
  }catch (error) {
        console.error(error); 
        return res.status(400).send({ mse: 'Something went wrong' });
  }
}