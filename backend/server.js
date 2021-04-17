import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js'


const app = express()
dotenv.config()
connectDB()

app.use(notFound)
app.use(errorHandler) //this will prevent sending error in Html format

app.listen(process.env.PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))