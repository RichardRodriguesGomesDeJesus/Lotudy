import { stripe } from "../../utils/stripe"
import jwt from 'jsonwebtoken'
import { UserModel } from "../../models/user"

export default async function CancelSubscription(req, res) {
  try{
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' });
    }

    const { token, subscriptionId } = req.body;
    
    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.userId) {
      return res.status(401).send({ error: 'Invalid token'})
    }

    const email = decoded.email
    const user = await UserModel.findOne({email: email})

    if (!token) {
      return res.status(400).send({ mse: 'Token is required' });
    }

    if (!subscriptionId) {
      return res.status(400).send({ mse: 'Subscription ID is missing' });
    }



    const subscriptions =  await stripe.subscriptions.list({
      customer: user.userStripeId,
      status: "active",
      expand: ["data.default_payment_method"]
    },{
      apiKey: process.env.STRIPE_SECRET
    })

    const id = subscriptions.data[0].id

    await stripe.subscriptions.cancel(id)

    res.status(200).send({msg: 'success'})

  } catch (error) {
    console.log(error)
    res.status(500).send({ mse: 'Something went wrong'});
  }
}