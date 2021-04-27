

import asyncHandler from "../middleWare/asyncHandler.js"
import Publication from "../models/publicationModel.js"

//@route    GET /api/publications/id
//@desc     Fetch single publication
//@access   public
const getPublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findById(req.params.id).populate('authors')
  if (!publication) {
    // return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
    throw new ErrorResponse(`Publication not found with id of ${req.params.id}`, 404)
  }
  res.status(200).json(publication)
})

//@route    GET /api/publications
//@desc     Fetch all publication
//@access   public
const getPublications = asyncHandler(async (req, res, next) => {

  const keyword = req.query.keyword
    ? {
      title: {
        $regex: req.query.keyword,
        $options: 'i',
      }
    } : req.query.filters && req.query.filters.length !== 0 ? {
      type: { $in: req.query.filters.split(',') }
    } : {}

  console.log(req.query.filters.split(','))
  const publications = await Publication.find({ ...keyword }).populate('authors')
  res.status(200).json(publications)
})

export { getPublication, getPublications }
