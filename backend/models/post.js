const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Userid: String,
    Text: String,
    MediaId:{ type : String, default: "" }, // optional
    Timestamp: { type : Date, default: Date.now },
    Keywords: {
        type: [String],
        enum: ['a','b','c'],
        default: 'a'
    },
    Skills: {
        type: [String],
        enum: ['a','b','c'],
        default: 'a'
    }
    
});

module.exports = mongoose.model('Post', postSchema)