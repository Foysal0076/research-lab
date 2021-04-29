import express from 'express'
import { authUser, getUser, getUsers, registerUser, editUser } from '../controllers/userController.js'
import { admin, protect } from '../middleWare/authMiddleWare.js'

const router = express.Router()

router.route('/').get(protect, admin, getUsers)
router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/:id')
    .get(protect, getUser)
    .put(protect, editUser)

export default router