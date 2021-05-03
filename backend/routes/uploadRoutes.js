import express from 'express'
import { protect } from '../middleWare/authMiddleWare.js'
import ErrorResponse from '../utils/ErrorResponse.js'
import path from 'path'
const router = express.Router()

router.post('/', protect, (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No file choosen')
        throw new ErrorResponse('No files were uploaded')
    }

    const file = req.files.file
    const fileName = new Date().getTime() + '-' + file.name
    const __dirname = path.resolve()
    file.mv(`${__dirname}/frontend/public/uploads/${fileName}`, err => {
        if (err) {
            console.log(err)
            throw new ErrorResponse('Upload Failed', 500)
        }
        res.json({ fileName, filePath: `/uploads/${fileName}` })
    })
})

export default router