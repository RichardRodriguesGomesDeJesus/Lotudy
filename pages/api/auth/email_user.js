import jwt from 'jsonwebtoken'
export default async function getEmail(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send({ mse: 'Method Not Allowed' })
    }
    
    const token =  req.body.token || req.query.token || req.headers["x-access-token"]
    
    const decoded = jwt.verify(token, process.env.SECRET)
    
    if (decoded.exp === undefined) {
      res.status(401).json({ error: 'Token is expired'})
    }
    return res.status(200).send({email: decoded.email})
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token is expired' })
    } else {
        res.status(401).json({ error: 'Token is invalid' })
    }
  }
}