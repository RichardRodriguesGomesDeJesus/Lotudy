import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import { StudyCycleModel } from '../../../models/user.js'

export default async function setSubjects(req, res) {
    try {
        if (req.method !== 'PUT') {
            return res.status(405).send({ mse: 'Method Not Allowed' });
        }
        
        const { token  , StudyCycle} = req.body;

        if (!token) {
            return res.status(403).send('A token is required');
        }
        if (!StudyCycle) {
            return res.status(403).send('A StudyCycle is required');
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        if (!decoded.userId) {
            return res.status(401).send({ error: 'Invalid token'});
        }

        await connectMongo();
        const studyCycle = await StudyCycleModel.find({ author: decoded.userId});

        if (studyCycle.length == 0) {
            return res.status(409).send({mse:'Study cycle not found'})
        }

        studyCycle[0].subjects  = StudyCycle
        await studyCycle[0].save()
        return res.status(200).send({ mse: 'success' });
    } catch (error) {
        console.error(error); 
        return res.status(400).send({ mse: 'Something went wrong' });
    }
}