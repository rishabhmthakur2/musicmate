const mongoose = require('mongoose');

const gigSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Userid: String,
    LocationName: String,
    Location: { Lat:Number, Long:Number},
    Timestamp: { type : Date, default: Date.now },
    EventLengthInMinutes: Number, 
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
    GigType: {
        type: String,
        enum: ['one time','full time', 'contract'],
        default: 'one time'
    },
    RequiredProficiency: {
        type: String,
        enum: ['a','b','c'],
        default: ''
    },
    Description: String
    
});

module.exports = mongoose.model('Gig', gigSchema)