const mongoose = require("mongoose");
let { Skills, Genres, MusicalExpertise, GigType } = require("./enums");

const gigSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  Userid: String,
  Name: String,
  LocationName: String,
  Location: { Lat: Number, Long: Number },
  Timestamp: { type: Date, default: Date.now },
  EventLengthInMinutes: Number,
  Genres: Genres,
  Skills: Skills,
  GigType: GigType,
  RequiredProficiency: MusicalExpertise,
  Description: String,
});

module.exports = mongoose.model("Gig", gigSchema);
