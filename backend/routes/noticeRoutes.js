import express from 'express'
import { createNotice, deleteNotice, editNotice, getNotices } from '../controllers/noticeController.js'
import { admin, protect } from '../middleWare/authMiddleWare.js'

const router = express.Router()

router
    .get('/', getNotices)
    .post('/', protect, admin, createNotice)

router.route('/:id')
    .put(protect, admin, editNotice)
    .delete(protect, admin, deleteNotice)

export default router

