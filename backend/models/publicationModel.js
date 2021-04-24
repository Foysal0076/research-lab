import mongoose from 'mongoose'

const publicationModel = mongoose.Schema({
    title: {
        type: String,
        requierd: true
    },
    type: {
        type: String,
        requierd: true
    },
    source: { type: String },
    authors: [mongoose.Schema.Types.ObjectId],
    authorNames: {
        type: String,
        required: true
    },

})

const Publication = mongoose.model('Publication', publicationModel)

export default Publication