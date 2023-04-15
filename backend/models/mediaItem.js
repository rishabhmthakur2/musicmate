const mongoose = require('mongoose');

const mediaItemSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Userid: String,
    URL: String,
    ShowOnProfile: { type: Boolean, default: true }
});

module.exports = mongoose.model('MediaItem', mediaItemSchema)