import asyncHandler from "../middleWare/asyncHandler.js"
import VisitorMessage from "../models/visitorMessageModel.js"
import ErrorResponse from '../utils/ErrorResponse.js'

//@route    GET /api/visitormessages
//@desc     get visitor messages
//@access   ADMIN
const getVisitorMessages = asyncHandler(async (req, res) => {

    const pageSize = 10
    const page = req.query.page || 1

    const count = await VisitorMessage.countDocuments({})
    const messages = await VisitorMessage.find({}).sort({ 'createdAt': -1 }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({
        messages,
        page,
        pages: Math.ceil(count / pageSize)
    })

})

//@route    POST /api/visitormessages
//@desc     Website visitor send  messages
//@access   Public
const sendMessageToAdmin = asyncHandler(async (req, res) => {

    const { name, email, message } = req.body
    const newMessage = new VisitorMessage({
        name: name || '',
        email: email,
        message: message,
    })
    const sentMessage = await newMessage.save()
    res.status(201).json(sentMessage)
})

//@route    DELETE /api/visitormessages/:id
//@desc     delete a visitor messages
//@access   protect / ADMIN
const deleteVisitorMessage = asyncHandler(async (req, res) => {
    const message = VisitorMessage.findById(req.params.id)
    if (message) {
        await message.remove()
        res.json({ success: true })
    } else {
        throw new ErrorResponse('Message not found', 404)
    }
})

export { getVisitorMessages, sendMessageToAdmin, deleteVisitorMessage }