import expressAsyncHandler from "express-async-handler"
import asyncHandler from "../middleWare/asyncHandler.js"
import User from "../models/userModel.js"
import ErrorResponse from "../utils/ErrorResponse.js"
import generateToken from "../utils/generateToken.js"


//@route    POST /api/users/login
//@desc     Auth user and get auth token
//@access   public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new ErrorResponse(`Invalid email or password`, 401)
    }
})

//@route    GET /api/users
//@desc     Fetch all users
//@access   private/admin
const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find({})
    res.status(200).json(user)
})

//@route    GET /api/users/id
//@desc     Fetch all users
//@access   private
const getUser = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        // return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
        throw new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    }
    res.status(200).json(user)
})

export { getUser, getUsers, authUser }