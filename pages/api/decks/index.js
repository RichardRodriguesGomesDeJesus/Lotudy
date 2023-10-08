import jwt from "jsonwebtoken"
import { connectMongo } from "../../../lib/connectMongo"
import { DeckModel } from "../../../models/user.js"
import validator from "validator"

export default async function createDeck(req, res) {
    try{
        if (req.method !== 'POST') {
            return res.status(405).send({ mse: 'Method Not Allowed' })
        }

        const { name, token } = req.body

        if (!name) {
            return res.status(422).send('name is required')
        }

        if (!token) {
            return res.status(403).send('A token is required')
        }

        const decoded = jwt.verify(token, process.env.SECRET)

        if (!decoded.userId) {
            return res.status(401).send({ error: 'Invalid token'})
        }

        if (validator.isAlpha(name,  'pt-PT') == false || name.length > 30) {
            return res.status(422).send('Nome do baralho deve conter apenas letras!')
        }

        await connectMongo()

        const decks = (await DeckModel.find({author:decoded.userId})).map((deck)=> deck.title)

        if (decks.includes(name) == true) {
            return res.status(409).send({mse: 'Já existe um baralho com esse nome.' })
        }

        const deck = {
            author: decoded.userId,
            title: name,
        }

        const newDeck = new DeckModel(deck)

        await newDeck.save()

        res.status(201).send({ mse: 'success!' })
        
    }catch (error) {
        res.status(500).send({ mse: 'Something went wrong'})
    }
}