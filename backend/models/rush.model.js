import mongoose from 'mongoose';

// Each rush should have: First Name, Last Name, Hometown, Number, Phone #, (Image)
const rushSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    hometownCity: {
        type: String,
        required: true
    },
    hometownState: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "cut", "bidded"]
    }
}, {
    timestamps: true
});

const Rush = mongoose.model('Rush', rushSchema);

export default Rush;