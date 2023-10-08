import { connectMongo } from "../../../lib/connectMongo"
import jwt from "jsonwebtoken"
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs'
import validator from "validator"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ mse: 'Method Not Allowed' })
      }
      const { email, password } = req.body
      if (!validator.isEmail(email)) {
        return res.status(422).send({ mse: 'The email provided is invalid' })
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
      if (!email) {
        return res.status(422).send({ mse: 'email is required' })
      }
      if (!password) {
        return res.status(422).send({ mse: 'password is required' })
      }
      try{
        await connectMongo()
        const user = await UserModel.find({email: email })
        if (user.length == 0) {
          return res.status(401).send('Senha ou e-mail incorreto')
        } else {
          const passwordMatch = await bcrypt.compare(password, user[0].password)
          if (passwordMatch) {
            const token = jwt.sign({
              userId: user[0]._id,
              email: email
            }, process.env.SECRET, { expiresIn: '12h' })
            res.status(201).send({mse:'successful authentication', token})
          } else {
            res.status(401).send('Senha ou e-mail incorreto')
          }
        }
      } catch (error) {
        return res.status(500).send({ mse: 'Ocorreu um erro ao processar a solicitação'})
      }
}
