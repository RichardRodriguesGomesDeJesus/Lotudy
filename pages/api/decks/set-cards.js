
import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { DeckModel } from '../../../models/user.js';

export default async function setCards(req, res)  {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token  ,  text, correctAnswer, time } = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }

    if (!text) {
      return res.status(403).send('Text is required');
    }

    if (!correctAnswer) {
      return res.status(403).send('CorrectAnswer is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    await connectMongo();
    const deck =  await DeckModel.find({author:decoded.userId});

    if (!deck) {
      return res.status(400).send({ mse: 'Deck not found' });
    }

    const newDeck = {
      text,
      correctAnswer
    }
    const userDeck = deck[0]
    userDeck.cards.push(newDeck)

    await userDeck.save();

    return res.status(200).send({mse:'card added to deck successfully'})

  } catch (error) {
        console.error(error); 
        return res.status(400).send({ mse: 'Something went wrong' });
  }
}