const mongoose = require('mongoose');

const mediaItemSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Userid: String,
    URL: String,
    ShowOnProfile: Boolean
});

module.exports = mongoose.model('MediaItem', mediaItemSchema)