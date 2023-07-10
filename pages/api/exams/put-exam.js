import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import {ExamModel } from '../../../models/user.js';

export default async function putExam(req,res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token  , time} = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }

    if (!time) {
      return res.status(403).send('Time is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    await connectMongo();

    const Exam =  await ExamModel.find({author:decoded.userId});

    if (!Exam) {
      return res.status(400).send({ mse: 'Exam not found' });
    }

    const userExam = Exam[0]

    userExam.time = time

    await  userExam.save()

    return res.status(200).send({mse:'Exam updated successfully' })
  }  catch (error) {
        console.error(error); 
        return res.status(400).send({ mse: 'Something went wrong' });
  }
}