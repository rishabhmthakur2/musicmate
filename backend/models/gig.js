const mongoose = require("mongoose");
let { Skills, Genres, MusicalExpertise, GigType } = require("./enums");

const gigSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  Userid: String,
  Name: String,
  LocationName: String,
  CompanyName: String,
  Location: { Lat: Number, Long: Number },
  Timestamp: { type: Date, default: Date.now },
  EventLengthInMinutes: Number,
  Genres: {
    type: [String],
    default: [""],
  },
  Skills: {
    type: [String],
    default: [""],
  },
  GigType: {
    type: [String],
    default: [""],
  },
  RequiredProficiency: {
    type: [String],
    default: [""],
  },
  Description: String,
});

module.exports = mongoose.model("Gig", gigSchema);
