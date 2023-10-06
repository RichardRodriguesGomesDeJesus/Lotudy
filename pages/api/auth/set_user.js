import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs'
import validator from 'validator'
import { stripe } from '../../../utils/stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ mse: 'Method Not Allowed' })
  }
  
  const { name, email, password } = req.body
  if (!validator.isLength(name, { min: 2 })) {
    return res.status(422).send({ mse: 'O nome deve ter pelo menos 2 caracteres' })
  }
  if(!validator.isAlphanumeric(name)){
    return res.status(422).send({ mse: 'O nome deve conter apenas letras e números' })
  }
  if (!validator.isEmail(email)) {
    return res.status(422).send({ mse: 'O e-mail fornecido é inválido' })
  }
  if (!validator.isStrongPassword(password, {
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    return res.status(422).send({ mse: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, números e símbolos' })
  }
  if (!name) {
    return res.status(422).send({ mse: 'name is required' })
  }
  if (!email) {
    return res.status(422).send({ mse: 'email is required' })
  }
  if (!password) {
    return res.status(422).send({ mse: 'password is required' })
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    await connectMongo()
    const user = await UserModel.find({email: email })
    if (user.length == 0) {
      const costumer = await stripe.customers.create({
        email: email
      },
      {
        apiKey: process.env.STRIPE_SECRET
      })
      const userObject ={
        name: name, 
        email: email,
        password: hashPassword,
        userStripeId: costumer.id
      }
      const newUser = new UserModel(userObject)
      try {
        await newUser.save()
        const secret = process.env.SECRET
        const token = jwt.sign({
          userId: newUser._id,
          email: email
        },secret, { expiresIn: '12h' })

        

        res.status(201).send({mse: 'sucesso!',token})
      } catch {
        res.status(500).send({ mse: 'Something went wrong' })
      }
    } else {
      res.status(409).send('Esse email já foi cadastrado')
    }
  } catch (error) { 
    return res.status(400).send({ mse: 'Something went wrong' })
  }
}
