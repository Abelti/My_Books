const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: 'string',
        required: [true, 'Please tell us your name']
    },
    userName: {
        type: String,
        required: [true, 'Please tell us your userName'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please tell us your email address'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please tell us your userName'],
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please re-tell us your password']
    }
});

module.exports = mongoose.model('user', userSchema);