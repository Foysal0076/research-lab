import express from 'express'
import { getPublication, getPublications } from '../controllers/publicationController.js'

const router = express.Router()

router.route('/').get(getPublications)
router.route('/:id').get(getPublication)

export default router