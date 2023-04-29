const mongoose = require("mongoose");
let {
  Skills,
  Genres,
  OnboardingReasons,
  MusicalExpertise,
} = require("./enums");

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  FirstName: String,
  LastName: String,
  Password: String,
  EmailId: String,
  Location: {
    lat: Number,
    long: Number,
    city: String,
  },
  LocationFlag: {
    type: Boolean,
    default: false,
  },
  OnboardingReasons: OnboardingReasons,
  OnboardingFlag: {
    type: Boolean,
    default: false,
  },
  Genres: Genres,
  GenresFlag: {
    type: Boolean,
    default: false,
  },
  Skills: Skills,
  SkillsFlag: {
    type: Boolean,
    default: false,
  },
  MusicalExpertise: MusicalExpertise,
  NotificationPreference: {
    type: Boolean, //not sure about optional part
    default: false,
  },
  ProfileCreationDate: { type: Date, default: Date.now },
  PhotoURL: String, // Not sure if there is a URL type in mongoose, and IF that is what we want to use.
  Description: String,
  Heading: String,
  BookmarkedProfiles: [String],
  BookmarkedGigs: [String],
  BookmarkedMediaItems: [String],
});

module.exports = mongoose.model("User", userSchema);
