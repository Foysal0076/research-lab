import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import members from './data/members.js'
import connectDB from './config/db.js'
import Member from './models/memberModel.js'
import User from './models/userModel.js'
import Publication from './models/publicationModel.js'
import publications from './data/publications.js'
import notices from './data/notices.js'
import Notice from './models/noticeModel.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Member.deleteMany()
        await User.deleteMany()
        await Publication.deleteMany()
        await Notice.deleteMany()

        const createdUsers = await User.insertMany(users)
        await Notice.insertMany(notices)

        const adminUser = createdUsers[0]._id

        const sampleMembers = members.map(member => {
            return { ...member, createdBy: adminUser }
        })
        const createdPublications = await Publication.insertMany(publications)
        const pub1 = createdPublications[0]._id
        const pub2 = createdPublications[1]._id
        const pub3 = createdPublications[2]._id

        const sampleMemberspub = sampleMembers.map(member => {
            if (member.email === 'foysalxahmed@gmail.com' || member.email === 'jane@gmail.com') {
                return { ...member, ...member.publications.push(pub1) }
            }
            if (member.email === 'kritanta@gmail.com') {
                return { ...member, ...member.publications.push(pub2, pub3) }
            }
            return member

        })

        await Member.insertMany(sampleMemberspub)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await Member.deleteMany()
        await User.deleteMany()
        await Publication.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] == '-d') {
    destroyData()
} else {
    importData()
}