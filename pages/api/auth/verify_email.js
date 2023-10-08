import { connectMongo } from '../../../lib/connectMongo.js'
import { UserModel } from "../../../models/user.js"
import validator from 'validator'
import jwt from 'jsonwebtoken'

export default async function verifyEmail(req,res) {
  try {
    if (req.method !== 'PUT'){
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }
  
    const { email } = req.body
  
    if (!validator.isEmail(email)) {
      return res.status(422).send({ mse: 'The email provided is invalid' })
    }

    await connectMongo()

    const user = await UserModel.findOne({email: email })

    if(user === null){
      return res.status(401).send("User not found")
    }

    const secret = process.env.SECRET

    const token = jwt.sign({
      email: email
    }, secret, {expiresIn: '2h'}) 
    
    res.status(200).json(token)
  } catch (error) {
    return res.status(500).send({ mse: 'Something went wrong'})
  }

}