import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { ExamModel } from "../../../models/user.js";

export default async function setQuestion(req, res) {
  try {
      if (req.method !== 'PUT') {
        return res.status(405).send({ mse: 'Method Not Allowed' });
      }
      const { token  , options , text, title, correctOption, img, subject } = req.body;

      if (!token) {
        return res.status(403).send('A token is required');
      }
      if (!options) {
        return res.status(403).send(' options is required');
      }
      if (!text) {
        return res.status(403).send(' text is required');
      }
      if (!title) {
        return res.status(403).send(' title is required');
      }
      if (!correctOption) {
        return res.status(403).send(' correctOption is required');
      }

      const decoded = jwt.verify(token, process.env.SECRET);

      if (!decoded.userId) {
        return res.status(401).send({ error: 'Invalid token'});
      }
      if (options.length < 2) {
        return res.status(403).send(' options is invalid');
      }

      await connectMongo();
      const exam = await ExamModel.find({author: decoded.userId,title: title});
      if (!exam) {
        return res.status(400).send({ mse: 'Exame not found' });
      }

      const userExam = exam[0]

      const newQuestion = {
        id: new mongoose.Types.ObjectId(),
        text: text,
        ...(img && { img: img }),
        ...(subject && {subject: subject}),
        options: options,
        correctOption
      };
      userExam.questions.push(newQuestion);

      await userExam.save();

      return res.status(200).send({ mse: 'Question successfully added to the exam' });
  } catch (error) {
      console.error(error); 
      return res.status(400).send({ mse: 'Something went wrong' });
  }
}