import express from 'express'
import { getVisitorMessages, sendMessageToAdmin, deleteVisitorMessage } from '../controllers/visitorMessageController.js'
import { protect, admin } from '../middleWare/authMiddleWare.js'
const router = express.Router()

router.route('/')
    .get(getVisitorMessages)
    .post(sendMessageToAdmin)
router.route('/:id').delete(protect, admin, deleteVisitorMessage)

export default router