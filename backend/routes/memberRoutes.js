import express from 'express'
import { createMember, getMemberById, getMembers, updateMember } from '../controllers/memberController.js'
import { protect, admin } from '../middleWare/authMiddleWare.js'

const router = express.Router()

// router.route('/').get(getMembers)
router.get('/', getMembers)

router.route('/:id')
    .get(getMemberById)
    .post(protect, admin, createMember)
router.route('/:id/edit').post(protect, updateMember)

export default router