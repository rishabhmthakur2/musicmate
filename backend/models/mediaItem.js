const mongoose = require("mongoose");

const mediaItemSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  Userid: String,
  URL: String,
  Title: String,
  Genres: {
    type: [String],
    default: [""],
  },
  Description: String,
  ThumbnailSrc: {
    type: String,
    default: "",
  },
  ShowOnProfile: { type: Boolean, default: true },
  Timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MediaItem", mediaItemSchema);
