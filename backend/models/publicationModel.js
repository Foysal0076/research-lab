import mongoose from 'mongoose'

const publicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    source: { type: String },
    authors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    authorNames: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})

const Publication = mongoose.model('Publication', publicationSchema)

export default Publication