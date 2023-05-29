import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { ExamModel } from "../../../models/user.js";

export default async function setQuestion(req, res) {
    try {
        if (req.method !== 'PUT') {
            return res.status(405).send({ mse: 'Method Not Allowed' });
          }
          const { token  , options , text, title, correctOption } = req.body;

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
          const exams = await ExamModel.find({ });
          const examsTitles = exams.filter(exam => exam.author == decoded.userId)
          const exam = examsTitles.find((exam) => exam.title === title);
          if (!exam) {
            return res.status(400).send({ mse: 'Exame não encontrado' });
          }
          const newQuestion = {
            id: new mongoose.Types.ObjectId(),
            text: text,
            options: options,
            correctOption
          };

          exam.questions.push(newQuestion);

          await exam.save();
      
          return res.status(200).send({ mse: 'Pergunta adicionada com sucesso ao exame' });
       
    } catch (error) {
        console.error(error); 
        return res.status(400).send({ mse: 'Something went wrong' });
      }
      finally {
        await mongoose.connection.close();
      }
}