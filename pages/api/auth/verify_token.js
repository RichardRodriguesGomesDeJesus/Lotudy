import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { UserModel } from "../../../models/user.js"

export default async function handler(req, res){
  try {
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const token =  req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, process.env.SECRET); // Verifica se o token é válido
    await connectMongo()
    const users = await UserModel.find({})
    const listIds = users.map(user =>  user.email)
    const user = listIds.includes( decoded.email);

    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else{
      res.status(200).send({msg:'success'})
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido'});
  }
}
