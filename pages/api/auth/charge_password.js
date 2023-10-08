import jwt from 'jsonwebtoken'
import { connectMongo } from '../../../lib/connectMongo.js'
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs'
import validator from 'validator'

export default async function verifyTokenEmail(req,res) {
  try{
    if (req.method !== 'PUT') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const {token, newPassword, email} = req.body
    
    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    if(!email){
      return res.status(403).send("email is required for authentication")
    }
    
    if(!newPassword){
      return res.status(403).send("newPassword is required for authentication")
    }

    if (!validator.isEmail(email)) {
      return res.status(422).send({ mse: 'Email invalido.' })
    }

    if (!validator.isStrongPassword(newPassword, {
      minLength: 8,
      maxLength: 20,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      return res.status(422).send({ mse: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, números e símbolos' })
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    if (decoded.exp === undefined) {
      return res.status(401).json({ mse: 'Token expirado ou invalido.'})
    }

    await connectMongo()
    
    if (decoded.email !== email) {
      return res.status(403).json({mse: "O email fornecido não corresponde ao email no token"})
    }    

    const user = await UserModel.findOne({email: decoded.email})

    const hashPassword = await bcrypt.hash(newPassword,10)

    if (user === null) {
      return res.status(404).json({ mse: 'Usuario não encontrado.' })
    } 
    
    user.password = hashPassword

    user.save()

    res.status(200).send("success")
  }catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ mse: 'Token expirado ou invalido.' })
    } else {
      return res.status(401).json({ mse: 'Token invalido ou invalido.' })
    }
  }
}