import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        default: 1000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);

export default userModel;
