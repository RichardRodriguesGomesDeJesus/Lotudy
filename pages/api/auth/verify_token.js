import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../lib/connectMongo.js';
import { UserModel } from "../../../models/user.js"
import { redirect } from 'next/dist/server/api-utils/index.js';

export default async function handler(req, res){
  try {
    if (req.method !== 'POST') {
      return redirect(res, '/login');
    }

    const token =  req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return redirect(res, '/login');
    }
    const decoded = jwt.verify(token, process.env.SECRET); // Verifica se o token é válido
    await connectMongo()
    const users = await UserModel.find({})
    const listIds = users.map(user =>  user.email)
    const user = listIds.includes( decoded.email);

    
    if (!user) {
      return redirect(res, '/login');
    } else{
      res.status(200).send({msg:'success'})
    }
    
    
  } catch (error) {
    return redirect(res, '/login');
  }
}
