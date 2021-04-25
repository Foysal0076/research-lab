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

export { getNotices }