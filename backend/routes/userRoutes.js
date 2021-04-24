import express from 'express'
import { authUser, getUser, getUsers } from '../controllers/userController.js'

const router = express.Router()

router.route('/').get(getUsers)
router.route('/login').post(authUser)
router.route('/:id').get(getUser)


export default router