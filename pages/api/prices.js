import jwt from 'jsonwebtoken';
import {stripe} from '../../utils/stripe'
export default async function getPrices (req,res) {
  try{
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token } = req.body;

    if (!token) {
      return res.status(403).send('A token is required');
    }
    
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'});
    }

    const prices =  await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET
    })
    res.status(200).json(prices)
  } catch (error) {
    console.log(error)
    res.status(500).send({ mse: 'Something went wrong'});
  }
}