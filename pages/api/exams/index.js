import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { ExamModel } from "../../../models/user.js"
import validator from 'validator';

export default async function createExam(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { name, token } = req.body;

    if (!name) {
      return res.status(422).send('name is required');
    }
    if (validator.isAlpha(name)== false) {
      return res.status(422).send('name is invalid')
    }
    if (!token) {
      return res.status(403).send('A token is required');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    await connectMongo();

    const exam = {
      author: decoded.userId,
      title: name,
      time: '0',
      correctAnswers: 0,
      mistakes: 0
    };

    const exams = (await ExamModel.find({ author:decoded.userId})).map((exam)=> exam.title)
    
    if (exams.includes(name) == true) {
      return res.status(409).send({mse: 'Já existe um exame com esse nome.' })
    }

    const newExam = new ExamModel(exam);

    await newExam.save();

    res.status(201).send({ mse: 'success!' });
    
  } catch (error) {
    res.status(500).send({ mse: 'Something went wrong'});
  }
}
