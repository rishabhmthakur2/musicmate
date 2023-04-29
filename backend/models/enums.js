const mongoose = require("mongoose");

const skills = mongoose.Schema({
  Skills: {
    type: [String],
    enum: [
      "Brass",
      "Conducting",
      "Composition",
      "Music Tech",
      "Piano",
      "Rearrangement",
      "Percussions",
      "Strings",
      "Transcription",
      "Woodwinds",
    ],
  },
});

const genres = mongoose.Schema({
  Genres: {
    type: [String],
    enum: [
      "Bossa Nova",
      "Classical",
      "Hip-hop",
      "Jazz",
      "Pop",
      "R&B",
      "Rock",
      "Soundtrack",
      "Alternatives",
    ],
  },
});

const onboardingReasons = mongoose.Schema({
  OnboardingReasons: {
    type: [String],
    enum: [
      "Explore gig opportunities",
      "Find jam mates",
      "Showcase work",
      "Expand network",
    ],
  },
});

const musicalExpertise = mongoose.Schema({
  MusicalExpertise: {
    type: String,
    enum: ["Beginner", "Intermediary", "Advanced", "Professional"],
  },
});
const gigType = mongoose.Schema({
  type: [String],
  enum: ["One Time", "Part Time", "Full Time"],
  default: "One Time",
});

const skillsModel = mongoose.model("SKills", skills);
const genresModel = mongoose.model("Genres", genres);
const onboardingReasonsModel = mongoose.model(
  "OnboardingReasons",
  onboardingReasons
);
const musicalExpertiseModel = mongoose.model(
  "MuscialExpertise",
  musicalExpertise
);
const gigTypeModel = mongoose.model("GigType", gigType);

module.exports = {
  Skills: skillsModel,
  Genres: genresModel,
  OnboardingReasons: onboardingReasonsModel,
  MusicalExpertise: musicalExpertiseModel,
  GigType: gigTypeModel,
};
