import express from 'express'
import { getVisitorMessages, sendMessageToAdmin } from '../controllers/visitorMessageController.js'

const router = express.Router()

router.route('/')
    .get(getVisitorMessages)
    .post(sendMessageToAdmin)

export default router