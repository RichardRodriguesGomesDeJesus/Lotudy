import { connectMongo } from '../../../lib/connectMongo.js'
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs'
import validator from 'validator'

export default async function name(req,res) {
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




  } catch (error) {
    return res.status(500).send({ mse: 'Ocorreu um erro ao processar a solicitação'})
  }

}