import mongoose from 'mongoose'
const memberSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        default: 'Researcher'
    },
    intro: {
        type: String,
        required: true
    },
    occupationalDesignation: {
        type: String,
        required: true
    },
    workPlace: {
        type: String,
    },
    labDesignation: {
        type: String,
        required: true,
        default: 'Member'
    },
    researchInterests: [String],
    image: {
        type: String,
        required: true
    },
    publications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication'
        }
    ],

    email: {
        type: String,
        required: true
    },
    address: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
        },
    },
    social: {
        facebook: {
            type: String,
        },
        linkedIn: {
            type: String,
        },
        researchGate: {
            type: String,
        },
        web: {
            type: String,
        },
        github: {
            type: String,
        },
    },
    mobile: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Member = mongoose.model('Member', memberSchema)
export default Member