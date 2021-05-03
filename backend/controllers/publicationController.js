
import asyncHandler from "../middleWare/asyncHandler.js"
import Publication from "../models/publicationModel.js"
import ErrorResponse from "../utils/ErrorResponse.js"

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
    const publications = await Publication.find({ ...keyword }).sort({ createdAt: -1 }).populate('authors')
    res.status(200).json(publications)
})

//@route    POST /api/publications
//@desc     Add a publication
//@access   protect & admin
const addPublication = asyncHandler(async (req, res, next) => {

    const { title, type, source, authors, authorNames } = req.body
    const publication = await Publication.create({
        title,
        type,
        source,
        authors,
        authorNames
    })
    if (publication) {
        res.status(200).json(publication)
    } else {
        throw new ErrorResponse('Create Failed')
    }

})

//@route    PUT /api/publications/id
//@desc     Edit a publication
//@access   protect & admin
const updatePublication = asyncHandler(async (req, res, next) => {

    const { title, type, source, authors, authorNames, authorId } = req.body
    const keyword = req.query.keyword
    const publication = await Publication.findById(req.params.id)
    if (publication) {
        if (authorId) {
            if (keyword && keyword === 'remove') {
                publication.authors = publication.authors.filter(item => item != authorId)
            } else {
                publication.authors.indexOf(authorId) === -1 ? publication.authors.push(authorId) : res.json({ message: 'Author already exists' })
            }
        } else {
            publication.title = title || publication.title
            publication.type = type || publication.type
            publication.source = source || publication.source
            publication.authors = authors || publication.authors
            publication.authorNames = authorNames || publication.authorNames
        }
    }
    const updatedPublication = await publication.save()

    if (updatedPublication) {
        res.status(200).json(updatedPublication)
    } else {
        throw new ErrorResponse('Update Failed')
    }

})


export { getPublication, getPublications, addPublication, updatePublication }
