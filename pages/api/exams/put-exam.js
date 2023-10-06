import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import {ExamModel } from '../../../models/user.js'
import validator from 'validator'

export default async function putExam(req,res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const { token  , time, correctAnswers,
      mistakes, title } = req.body

    if (!token) {
      return res.status(403).send('A token is required')
    }

    if (!time) {
      return res.status(403).send('Time is required')
    }

    if ( typeof correctAnswers === undefined) {
      return res.status(403).send('correctAnswers is required')
    }

    if ( typeof mistakes === undefined ) {
      return res.status(403).send('mistakes is required')
    }

    if (!title) {
      return res.status(403).send('title is required')
    }

    if (validator.isAlpha(title)== false || title.length > 30) {
      return res.status(422).send('title is invalid')
    }

    if (typeof mistakes !== 'number' || mistakes < 0 ) {
      return res.status(422).send('mistakes is invalid')
    }

    if (typeof correctAnswers !== 'number' || correctAnswers < 0 ) {
      return res.status(422).send('correctAnswers is invalid')
    }

    if (validator.isAlpha(title)== false || title.length > 30) {
      return res.status(422).send('title is invalid')
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'})
    }

    await connectMongo()

    const Exam =  await ExamModel.find({author:decoded.userId, title: title})
    if (!Exam) {
      return res.status(400).send({ mse: 'Exam not found' })
    }

    const userExam = Exam[0]

    userExam.time = time

    userExam.mistakes += mistakes

    userExam.correctAnswers += correctAnswers

    await  userExam.save()

    return res.status(200).send({mse:'Exam updated successfully' })
  }  catch (error) {
        console.error(error) 
        return res.status(400).send({ mse: 'Something went wrong' })
  }
}