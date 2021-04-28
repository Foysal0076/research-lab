import mongoose from 'mongoose'

const visitorMessageSchema = mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const VisitorMessage = mongoose.model('VisitorMessage', visitorMessageSchema)

export default VisitorMessage