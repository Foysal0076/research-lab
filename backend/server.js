import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import membeRoutes from './routes/memberRoutes.js'
import userRoutes from './routes/userRoutes.js'
import publicationRoutes from './routes/publicationRoutes.js'
import noticeRoutes from './routes/noticeRoutes.js'
import visitorMessageRoutes from './routes/visitorMessageRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleWare/errorMiddleWare.js'
import fileUpload from 'express-fileupload'

const app = express()
dotenv.config()
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(fileUpload())

app.get('/', (req, res) => res.send(`App is running on port ${process.env.PORT}`))

//Routes
app.use('/api/members', membeRoutes)
app.use('/api/users', userRoutes)
app.use('/api/publications', publicationRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/visitormessages', visitorMessageRoutes)
app.use('/api/upload', uploadRoutes)

app.use(notFound) //This will send error if a request arrives with invalid url
app.use(errorHandler) //This will prevent sending error in Html format


app.listen(process.env.PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))