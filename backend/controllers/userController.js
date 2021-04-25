import expressAsyncHandler from "express-async-handler"
import asyncHandler from "../middleWare/asyncHandler.js"
import User from "../models/userModel.js"
import ErrorResponse from "../utils/ErrorResponse.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcryptjs'

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

//@route    POST /api/users/register
//@desc     Register a user
//@access   public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
        throw new ErrorResponse('User Already Exists with this e-mail')
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new ErrorResponse(`User Registration Failed`, 400)
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
//@desc     Fetch single user
//@access   private
const getUser = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        // return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
        throw new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    }
    res.status(200).json(user)
})

//@route    POST /api/users/
//@desc     Register a user
//@access   public
const editUser = asyncHandler(async (req, res) => {
    const { name, email, isAdmin, password } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    user.name = name || user.name
    user.email = email || user.email
    user.isAdmin = isAdmin || user.isAdmin

    const updatedUser = await user.save()
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })
})

export { getUser, getUsers, authUser, registerUser, editUser }