import { stripe } from "../../utils/stripe"
import jwt from "jsonwebtoken"
import { connectMongo } from "../../lib/connectMongo"
import { UserModel } from "../../models/user"

export default async function session (req,res) {
  try{
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const { token , priceId} = req.body
    
    if (!token) {
      return res.status(403).send('A token is required')
    }

    if (!priceId) {
      return res.status(403).send('A priceId is required')
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'})
    }
    
    await connectMongo()

    const email = decoded.email
    const user = await UserModel.findOne({email: email})
    const session = await stripe.checkout.sessions.create({
      mode:"subscription",
      payment_method_types:["card"],
      line_items:[{
        price: priceId,
        quantity: 1,
      }],
      success_url: "/dashboard",
      cancel_url: "/plans",
      customer: user.userStripeId
    },
    {
      apiKey: process.env.STRIPE_SECRET
    })
    return res.status(200).json(session)
  } catch (error) {
    res.status(500).send({ mse: 'Something went wrong'})
  }
}