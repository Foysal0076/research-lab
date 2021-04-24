import express from 'express'
import { getMemberById, getMembers } from '../controllers/memberController.js'

const router = express.Router()

// router.route('/').get(getMembers)
router.get('/',getMembers)

router.route('/:id').get(getMemberById)

export default router