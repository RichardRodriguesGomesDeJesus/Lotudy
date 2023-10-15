import { connectMongo } from "../../../lib/connectMongo"
import jwt from "jsonwebtoken"
import { UserModel, DeckModel, ExamModel, StudyCycleModel } from "../../../models/user.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { stripe } from '../../../utils/stripe'

export default async function deleteUser(req, res) {
  try{
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: "Method Not Allowed" })
    }

    const {token, password} = req.body

    if (!token) {
      return res.status(403).send({err: "token is require"})
    }
    
    if (!password) {
      return res.status(403).send({mse: "É necessario sua senha."})
    }

    if (!validator.isStrongPassword(password, {
      minLength: 8,
      maxLength: 20,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      return res.status(422).send({ mse: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, números e símbolos.' })
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    if (decoded.exp === undefined) {
      return res.status(401).json({ err: 'Token is invalid'})
    }

    await connectMongo()

    const user = await UserModel.findOne({_id: decoded.userId})
    
    if (user === null) {
      return  res.status(403).json({err: "Token is invalid"})
    }
    const compare = await bcrypt.compare(password,user.password)

    if (compare === false) {
      return res.status(403).json({mse: "Senha incorreta."})
    }

    await ExamModel.deleteMany({author: user._id})
    await DeckModel.deleteMany({author: user._id})
    await StudyCycleModel.deleteMany({author: user._id})

    try{
      await stripe.customers.del(`${user.userStripeId}`)
      await UserModel.deleteMany({_id: user._id})
      return res.status(200).json({msg:"Conta excluida."})
    } catch (err) {
      console.log(err)
      return res.status(500).json({msg:"Algo deu errado."})
    }
  } catch (error) {
    console.log(error)
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token is expired" })
    } else {
      res.status(401).json({ error: "Token is invalid" })
    }
  }
}