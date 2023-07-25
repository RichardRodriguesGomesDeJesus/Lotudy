import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { ExamModel } from '../../../models/user.js';

export default async function putQuestions(req,res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token  , questions , title} = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }

    if (!questions) {
      return res.status(403).send('Questions is required');
    }

    if (!title) {
      return res.status(403).send('Title is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    await connectMongo();

    const exam = await ExamModel.find({ author: decoded.userId, title: title })

    if (!exam) {
      return res.status(400).send({ mse: 'Exam not found' });
    }
    const userExam = exam[0]

    userExam.questions = questions

    userExam.save()
    return res.status(200).send({mse:'questions added to exam successfully'})
  } catch (error) {
    console.error(error); 
    return res.status(400).send({ mse: 'Something went wrong' });
  }
}