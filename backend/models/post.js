const mongoose = require("mongoose");
let {
  Skills,
  Genres,
  OnboardingReasons,
  MusicalExpertise,
} = require("./enums");

const postSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  Userid: String,
  Title: String,
  Description: String,
  MediaId: { type: String, default: "" }, // optional
  Timestamp: { type: Date, default: Date.now },
  Genres: {
    type: [String],
    default: [""],
  },
  Skills: {
    type: [String],
    default: [""],
  },
  ShowOnProfile: {
    type: Boolean,
    default: true,
  },
  ThumbnailSrc: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Post", postSchema);
