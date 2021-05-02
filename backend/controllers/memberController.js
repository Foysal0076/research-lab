
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

//@route    GET /api/members/byuserid/id
//@desc     Fetch single member by userid
//@access   private
const getMemberByUserId = asyncHandler(async (req, res, next) => {

    const member = await Member.findOne({ user: req.params.id }).populate('publications')
    if (!member) {
        res.status(404).json({ data: [] })
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
        researchInterests: researchInterests.trim().split(','),
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

//@route    PUT /api/members/id
//@desc     update member /profile
//@access   Private, Admin
// const updateMember = asyncHandler(async (req, res, next) => {
//     const { name, email, gender, joiningDate, type, intro, occupationalDesignation, workPlace, labDesignation, researchInterests, image, publications, address, social, mobile } = req.body

//     const member = {
//         user: req.params.id,
//         name,
//         email,
//         gender,
//         joiningDate,
//         type,
//         intro,
//         occupationalDesignation,
//         workPlace,
//         labDesignation,
//         researchInterests,
//         image,
//         publications,
//         address,
//         social,
//         mobile,
//         createdBy: req.user.id
//     }

//     const memberExist = await Member.findById(req.params.id)

//     if (memberExist) {
//         //Update member
//         const updatedMember = await Member.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: member },
//             { new: true }
//         )
//         res.status(200).json(updatedMember)
//     } else {
//         throw new ErrorResponse(`Member profile not found with id ${req.params.id}`)
//     }

// })

//@route    PUT /api/members/id
//@desc     update member /profile
//@access   Private, Admin
const updateMember = asyncHandler(async (req, res, next) => {
    const { name, email, gender, joiningDate, type, intro, occupationalDesignation, workPlace, labDesignation, researchInterests, image, publications, address, social, mobile } = req.body

    const member = await Member.findOne({ user: req.params.id })

    if (member) {
        member.name = name || member.name
        member.email = email || member.email
        member.gender = gender || member.gender
        member.joiningDate = joiningDate || member.joiningDate
        member.type = type || member.type
        member.intro = intro || member.intro
        member.occupationalDesignation = occupationalDesignation || member.occupationalDesignation
        member.workPlace = workPlace || member.workPlace
        member.labDesignation = labDesignation || member.labDesignation
        member.researchInterests = researchInterests || member.researchInterests
        member.image = image || member.image
        member.publications = publications || member.publications
        member.address = address || member.address
        member.social = social || member.social
        member.mobile = mobile || member.mobile

        const updatedMember = await member.save()
        if (updateMember) {
            res.status(201).json(updatedMember)
        }
    } else {
        throw new ErrorResponse(`Member profile not found with id ${req.params.id}`)
    }

})

export { getMembers, getMemberById, createMember, updateMember, getMemberByUserId }