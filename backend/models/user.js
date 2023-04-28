const mongoose = require("mongoose");

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
  OnboardingReason: {
    type: String,
    enum: ["a", "b", "c"],
    default: "a",
  },
  OnboardingFlag: {
    type: Boolean,
    default: false,
  },
  Keywords: {
    type: [String],
    enum: ["a", "b", "c"],
    default: "a",
  },
  KeywordsFlag: {
    type: Boolean,
    default: false,
  },
  Skills: {
    type: [String],
    enum: ["a", "b", "c"],
    default: "a",
  },
  SkillsFlag: {
    type: Boolean,
    default: false,
  },
  MusicalExpertise: {
    type: String,
    enum: ["a", "b", "c"],
    default: "a",
  },
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
