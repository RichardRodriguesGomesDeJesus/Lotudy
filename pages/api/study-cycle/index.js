import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import { StudyCycleModel } from '../../../models/user.js'

export default async function createStudyCycle(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).send({ mse: 'Method Not Allowed' })
        }

        const { StudyCycle, token } = req.body

        if (!StudyCycle) {
            return res.status(422).send('StudyCycle is required')
        }
        if (StudyCycle.length === 0) {
            return res.status(422).send('StudyCycle  cannot be an empty Array', StudyCycle)
        }
        if (!token) {
            return res.status(403).send('A token is required')
        }

        const decoded = jwt.verify(token, process.env.SECRET)

        if (!decoded.userId) {
            return res.status(401).send({ error: 'Invalid token'})
        }

        const existStudyCycle = await StudyCycleModel.findOne({author:decoded.userId})

        if (existStudyCycle !== null) {
            return res.status(409).json({mse: "You already have a study cycle and you cannot create another one."})
        }

        await connectMongo()

        const Cycle = {
            author: decoded.userId,
            subjects: [...StudyCycle]
        }
        const newStudyCycle = new StudyCycleModel(Cycle)
        
        newStudyCycle.save()

        res.status(201).send({ mse: 'success!' })
    } catch (error) {
        res.status(500).send({ mse: 'Something went wrong'})
    }
}