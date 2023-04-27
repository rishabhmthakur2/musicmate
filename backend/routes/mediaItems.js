var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const MediaItems = require("../models/mediaItem");

/**
 * @swagger
 * /mediaItems/{id}:
 *  get:
 *    tags:
 *      - mediaItems
 *    description: Get information about a single media Item
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: details about a single media item
 */
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

/**
 * @swagger
 * /mediaItems:
 *  get:
 *    tags:
 *      - mediaItems
 *    description: Get all media items
 *    responses:
 *      '200':
 *        description: list of all media items
 */
router.get("/", function (req, res) {
  MediaItems.find({}, function (err, mediaItemss) {
    var mediaItemsMap = {};

    mediaItemss.forEach(function (mediaItems) {
      mediaItemsMap[mediaItems._id] = mediaItems;
    });

    res.send(mediaItemsMap);
  });
});

/**
 * @swagger
 * /mediaItems:
 *  post:
 *    tags:
 *      - mediaItems
 *    description: Create a new media item
 *    responses:
 *      '200':
 *        description: Creates a new document for the media item
 */
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

/**
 * @swagger
 * /mediaItems/{id}:
 *  patch:
 *    tags:
 *      - mediaItems
 *    description: Update information about a single media Item
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Update details about a single media item
 */
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
