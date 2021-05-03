import asyncHandler from "../middleWare/asyncHandler.js"
import ErrorResponse from '../utils/ErrorResponse.js'
import Notice from '../models/noticeModel.js'

//@route    GET /api/notices
//@desc     Fetch all notices
//@access   public
const getNotices = asyncHandler(async (req, res) => {
    const notices = await Notice.find({}).limit(8).sort({ createdAt: -1 })
    if (notices.length === 0) {
        throw new ErrorResponse('No notice found', 404)
    }
    res.status(200).json(notices)
})

//@route    POST /api/notices
//@desc     Create Notice
//@access  protect / ADMIN
const createNotice = asyncHandler(async (req, res) => {
    const { title, body, footnote } = req.body

    const newNotice = await Notice.create({
        title,
        body,
        footnote,
        createdBy: req.user._id
    })

    if (newNotice) {
        res.status(201).json(newNotice)
    } else {
        throw new ErrorResponse('Notice create fail', 500)
    }

})

//@route    PUT /api/notices
//@desc     Edit a Notice
//@access   protect / ADMIN
const editNotice = asyncHandler(async (req, res) => {
    const { title, body, footnote } = req.body

    const notice = await Notice.findById(req.params.id)
    if (notice) {
        notice.title = title || notice.title
        notice.body = body || notice.body
        notice.footnote = footnote || notice.footnote
    } else {
        throw new ErrorResponse(`Notice not found with id ${req.params.id}`, 404)
    }
    const editedNotice = await notice.save()

    if (editedNotice) {
        res.status(201).json(editedNotice)
    } else {
        throw new ErrorResponse('Edit Notice fail', 500)
    }

})

//@route    PUT /api/notices
//@desc     Edit a Notice
//@access   protect / ADMIN
const deleteNotice = asyncHandler(async (req, res) => {

    const notice = await Notice.findById(req.params.id)

    if (notice) {
        await notice.remove()
        res.status(200).json({ success: true })
    } else {
        throw new ErrorResponse('Delete Fail', 500)
    }

})

export { getNotices, createNotice, editNotice, deleteNotice }