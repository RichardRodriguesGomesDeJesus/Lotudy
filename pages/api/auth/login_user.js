import { connectMongo } from '../../../lib/connectMongo.js';
import { User } from '../../../models/User.js';
import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
    if (req.method == 'Get') {
        return res.status(405).send({ mse: 'Method Not Allowed' });
    }
}
