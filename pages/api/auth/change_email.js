import validator from "validator"
import jwt from "jsonwebtoken"
import { connectMongo } from "../../../lib/connectMongo"
import { UserModel } from "../../../models/user.js"


export default async  function ChangeEmail(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const {token, email}  = req.body

    if (!token) {
      return res.status(403).send('A token is required')
    }
    
    if (!email) {
      return res.status(403).send('Email is required')
    }
    
    if (!validator.isEmail(email)) {
      return res.status(422).send('O e-mail fornecido é inválido')
    }

    await connectMongo()

    const emailExist = await UserModel.find({email: email })

    if (emailExist.length > 0) {
      return res.status(409).send('Esse email já foi cadastrado, use outro.')
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    const user = await UserModel.findOne({ _id: decoded.userId})
    
    if (decoded.exp === undefined) {
      res.status(401).json({ error: 'Token is expired'})
    }

    user.email = email

    user.save()

    const newToken = jwt.sign({
      userId: decoded.userId,
      email: email
    },
    process.env.SECRET,{ expiresIn: '12h' })
    return res.status(200).send(newToken)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token is expired' })
    } else {
        res.status(401).json({ error: 'Token is invalid' })
    }

  }
}