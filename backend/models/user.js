const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    FirstName: String,
    LastName: String,
    Password: String,
    EmailId: String,
    Location: {
        lat: Number,
        long: Number
    },
    OnboardingReason: {
        type: String,
        enum : ['a','b','c'],
        default: 'a'
    },
    Keywords: {
        type: [String],
        enum: ['a','b','c'],
        default: 'a'
    },
    Skills: {
        type: [String],
        enum: ['a','b','c'],
        default: 'a'
    },
    MusicalExpertise: {
        type: String,
        enum: ['a','b','c'],
        default: 'a'
    },
    NotificationPreference: {
        type: Boolean, //not sure about optional part
        default: false
    },
    ProfileCreationDate: { type : Date, default: Date.now },
    PhotoURL: String, // Not sure if there is a URL type in mongoose, and IF that is what we want to use.
    Description: String, 
    Heading: String, 
    BookmarkedProfiles: [String]
    
});

module.exports = mongoose.model('User', userSchema)