var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const MediaItems = require("../models/mediaItem");

// Get details of one mediaItems based on FirstName
router.get("/:id", async (request, response) => {
  var tempid = request.params.id;

  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await MediaItems.find({ _id: request.params.id });
      try {
        response.status(200).send(output);
      } catch (error) {
        response.status(500).send(error);
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }
});

// GET listing for all mediaItemss.
router.get("/", function (req, res) {
  MediaItems.find({}, function (err, mediaItemss) {
    var mediaItemsMap = {};

    mediaItemss.forEach(function (mediaItems) {
      mediaItemsMap[mediaItems._id] = mediaItems;
    });

    res.send(mediaItemsMap);
  });
});

// Create a new mediaItems
router.post("/", (req, res, next) => {
  const mediaItems = new MediaItems({
    _id: new mongoose.Types.ObjectId(),
    UserId: req.body.UserId,
    URL: req.body.URL,
    ShowOnProfile: req.body.ShowOnProfile,
  });

  mediaItems.save().then;

  res.status(200).json({
    message: "Handling GET request on /",
    createdMediaItems: mediaItems,
  });
});

// Updating a mediaItems with a given id
router.patch("/:id", async (request, response) => {
  try {
    await MediaItems.findByIdAndUpdate(request.params.id, request.body);
    // await MediaItems.save();
    response.send("updated mediaItems" + request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
