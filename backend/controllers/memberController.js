
import asyncHandler from '../middleWare/asyncHandler.js'
import Member from '../models/memberModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

//@route    GET /api/members
//@desc     Fetch all members
//@access   Public
const getMembers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      }
    } : {}

  const members = await Member.find({ ...keyword })
  res.json(members)

})

//@route    GET /api/members/id
//@desc     Fetch single member
//@access   Public
const getMemberById = asyncHandler(async (req, res, next) => {

  const member = await Member.findById(req.params.id).populate('publications')
  if (!member) {
    throw new ErrorResponse(`Member not found with id ${req.params.id}`, 404)
  }

  res.status(200).json(member)
})

//@route    POST /api/members
//@desc     Create member /profile
//@access   Admin
const createMember = asyncHandler(async (req, res, next) => {
  const { name, email, gender, joiningDate, type, intro, occupationalDesignation, workPlace, labDesignation, researchInterests, image, publications, address, social, mobile } = req.body

  const member = {
    user: req.params.id,
    name,
    email,
    gender,
    joiningDate,
    type,
    intro,
    occupationalDesignation,
    workPlace,
    labDesignation,
    researchInterests,
    image,
    publications,
    address,
    social,
    mobile,
    createdBy: req.user.id
  }

  const memberExist = await Member.findOne({ user: req.params.id })

  if (memberExist) {
    //Update member
    // const updatedMember = await Member.findOneAndUpdate(
    //     { user: req.params.id },
    //     { $set: member },
    //     { new: true }
    // )
    // res.status(200).json(updatedMember)

    throw new ErrorResponse('Member already exists')
  } else {
    //Create new member
    const newMember = await new Member(member).save()
    res.json(newMember)
  }

})

//@route    POST /api/members/id
//@desc     update member /profile
//@access   Private, Admin
const updateMember = asyncHandler(async (req, res, next) => {
  const { name, email, gender, joiningDate, type, intro, occupationalDesignation, workPlace, labDesignation, researchInterests, image, publications, address, social, mobile } = req.body

  const member = {
    user: req.params.id,
    name,
    email,
    gender,
    joiningDate,
    type,
    intro,
    occupationalDesignation,
    workPlace,
    labDesignation,
    researchInterests,
    image,
    publications,
    address,
    social,
    mobile,
    createdBy: req.user.id
  }

  const memberExist = await Member.findById(req.params.id)

  if (memberExist) {
    //Update member
    const updatedMember = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: member },
      { new: true }
    )
    res.status(200).json(updatedMember)
  } else {
    throw new ErrorResponse(`Member profile not found with id of ${req.params.id}`)
  }

})


export { getMembers, getMemberById, createMember, updateMember }