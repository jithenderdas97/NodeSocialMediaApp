const {verify, TokenExpiredError} = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        let headers = req.headers.authorization
        if (!headers) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        let token = headers.split(' ')[1]
        const validTokenData = await verify(token, process.env.JWT_SECRET)
        req.user = validTokenData
        next()
    } catch (error) {
        if(error instanceof TokenExpiredError) {
            return res.status(401).json({ message: 'Your token expired' })
        }
        return res.status(500).json({ message: error })
    }
}

module.exports = verifyToken