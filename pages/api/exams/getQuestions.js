import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import { ExamModel } from "../../../models/user.js"

export default async function getQuestions(req,res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).send({ mse: 'Method Not Allowed' });
        }
    
        const { token  , title } = req.body;
    
        if (!token) {
            return res.status(403).send('A token is required');
        }
        if (!title) {
          return res.status(403).send('A token is required');
        }

        const decoded = jwt.verify(token, process.env.SECRET)

        if (!decoded.userId) {
          return res.status(401).send({ error: 'Invalid token'});
        }
        await connectMongo();

        const exam = await ExamModel.find({ author: decoded.userId, title: title });
        if (!exam) {
          return res.status(400).send({ mse: 'exame not found' });
        }
        res.status(200).send({exam: exam[0]})
    }catch (error) {
        console.error(error); 
        return res.status(400).send({ mse: 'Something went wrong' });
    }
}