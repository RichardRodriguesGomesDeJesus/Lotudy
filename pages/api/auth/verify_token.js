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
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.exp === undefined) {
      res.status(401).json({ error: 'Token is expired'})
    }
    await connectMongo()
    const user = await UserModel.find({email: decoded.email})
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } 
    
    res.status(200).send({msg:'success'})
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token is expired' });
  } else {
      res.status(401).json({ error: 'Token is invalid' });
  }
  }
}
