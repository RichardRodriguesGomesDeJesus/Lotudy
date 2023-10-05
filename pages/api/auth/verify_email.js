import { connectMongo } from '../../../lib/connectMongo.js'
import { UserModel } from "../../../models/user.js"
import bcrypt from 'bcryptjs'
import validator from 'validator'

