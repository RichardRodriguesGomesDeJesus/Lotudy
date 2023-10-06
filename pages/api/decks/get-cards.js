import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import { DeckModel } from "../../../models/user.js"

export default async function getCards(req,res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const { token  , title } = req.body

    if (!token) {
      return res.status(403).send('A token is required')
    }

    if (!title) {
      return res.status(403).send('A token is required')
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'})
    }

    await connectMongo()

    const deck = await DeckModel.find({ author: decoded.userId ,title: title })

    if (!deck) {
      return res.status(400).send({ mse: 'deck not found'})
    }

    const userDeck = deck[0] 

    res.status(200).send({deck:userDeck })

  } catch (error) {
        console.error(error) 
        return res.status(400).send({ mse: 'Something went wrong' })
  }
}