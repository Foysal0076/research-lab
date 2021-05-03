import express from 'express'
import { addPublication, getPublication, getPublications, updatePublication } from '../controllers/publicationController.js'
import { protect, admin } from '../middleWare/authMiddleWare.js'

const router = express.Router()

router.route('/')
    .get(getPublications)
    .post(protect, admin, addPublication)
router.route('/:id')
    .get(getPublication)
    .put(protect, admin, updatePublication)

export default router