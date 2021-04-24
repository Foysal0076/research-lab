import mongoose from 'mongoose'

const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    footnote: {
        type: String,
    }
}, {
    timestamps: true
})

const Notice = mongoose.model('Notice', noticeSchema)
export default Notice