// Creating a Mongoose Schema with user details Properties.

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

//Schema
const  userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    billingID: {
        type: String
    },
    plan: {
        type: String, 
        enum: ['none', 'basic', 'premium'], default: 'none' // Using enum allows to set pre-defined payment plan constants.
    }, 
    hasTrialVersion: {
        type: Boolean, default: false
    },
    endDate: {
        type: Date, default: null
    },
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password)
};

mongoose.model('User', UserSchema);
 