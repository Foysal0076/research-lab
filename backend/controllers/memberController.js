
import asyncHandler from '../middleWare/asyncHandler.js'
import Member from '../models/memberModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

//@route    GET /api/members
//@desc     Fetch all members
//@access   Public
const getMembers = asyncHandler(async (req, res) => {

    const members = await Member.find({})
    res.json(members)

})

//@route    GET /api/members/id
//@desc     Fetch single member
//@access   Public
const getMemberById = asyncHandler(async (req, res, next) => {

    const member = await Member.findById(req.params.id).populate(
        'publications', 'title'
    )
    if (!member) {
        return next(new ErrorResponse(`Member not found with id ${req.params.id}`, 404))
    }

    res.status(200).json(member)
})


export { getMembers, getMemberById }