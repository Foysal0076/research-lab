

import asyncHandler from "../middleWare/asyncHandler.js"
import Publication from "../models/publicationModel.js"

//@route    GET /api/users/id
//@desc     Fetch single user
//@access   private
const getPublications = asyncHandler(async (req, res, next) => {
    const publication = await Publication.findById(req.params.id).populate('authors','name')
    if (!publication) {
        // return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
        throw new ErrorResponse(`Publication not found with id of ${req.params.id}`, 404)
    }
    res.status(200).json(publication)
})

export { getPublications }