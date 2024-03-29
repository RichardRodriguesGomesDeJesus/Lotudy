import { stripe } from "../../utils/stripe"
import jwt from "jsonwebtoken"
import { UserModel } from "../../models/user"

export default async function subscriptionCheck(req,res) {
  try{
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }

    const { token } = req.body

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'})
    }

    const email = decoded.email
    const user = await UserModel.findOne({email: email})
    const subscriptions =  await stripe.subscriptions.list({
      customer: user.userStripeId,
      status: "active",
      expand: ["data.default_payment_method"]
    },{
      apiKey: process.env.STRIPE_SECRET
    })
    if (!subscriptions.data.length === 0) return res.json([])
    const plan = subscriptions.data[0]?.plan?.nickname || 'Gratuito'
    res.status(200).json(plan)
  } catch (error) {
    res.status(500).send({ mse: 'Something went wrong'})
  }
}