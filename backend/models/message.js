const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    sender_id: String,
    receiver_id: String,
    message_content: String,
    sent_at: { type : Date, default: Date.now },
    is_read: { type : Boolean, default: false },
    is_deleted: { type: Boolean, default: false }
    
});

module.exports = mongoose.model('Message', messageSchema)