import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { DeckModel } from "../../../models/user.js"

export default async function createDeck(req, res) {
    try{
        if (req.method !== 'POST') {
            return res.status(405).send({ mse: 'Method Not Allowed' });
        }

        const { name, token } = req.body;

        if (!name) {
            return res.status(422).send('name is required');
        }

        if (!token) {
            return res.status(403).send('A token is required');
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        if (!decoded.userId) {
            return res.status(401).send({ error: 'Invalid token'});
        }

        await connectMongo();

        const deck = {
            author: decoded.userId,
            title: name,
        };

        const newDeck = new DeckModel(deck);

        await newDeck.save()
        res.status(201).send({ mse: 'success!' });
    }catch (error) {
        res.status(500).send({ mse: 'Something went wrong'});
    }
}