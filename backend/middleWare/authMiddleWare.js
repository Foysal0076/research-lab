import asyncHandler from './asyncHandler.js'
import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/ErrorResponse.js'
import User from '../models/userModel.js'


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            throw new ErrorResponse('Not Authorized, Token Failed', 401)
        }
    }
    if (!token) {
        res.status(401)
        throw new ErrorResponse('Not Authorized, No Token', 401)
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        throw new ErrorResponse('Not Authorized as Admin',401)
    }
}

export { protect, admin }