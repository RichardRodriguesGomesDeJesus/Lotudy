import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { DeckModel } from "../../../models/user.js"

export default async function getDecksList(req, res) {
  try{
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }
    const { token } = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    await connectMongo();

    const decks = await DeckModel.find({author: decoded.userId })

    const decksTitles = decks.map(deck => deck.title)
    res.status(200).send({list: decksTitles})
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ mse: 'Something went wrong'});
  }
}