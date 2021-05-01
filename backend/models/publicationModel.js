import mongoose from 'mongoose'

const publicationSchema = mongoose.Schema({
    title: {
        type: String,
        requierd: true
    },
    type: {
        type: String,
        requierd: true
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

})

const Publication = mongoose.model('Publication', publicationSchema)

export default Publication