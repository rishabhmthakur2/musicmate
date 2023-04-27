var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/post");
const MediaItems = require("../models/mediaItem");

/**
 * @swagger
 * /posts/{id}:
 *  get:
 *    tags:
 *      - posts
 *    description: Get information about a single post
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: details about a single post
 */
router.get("/:id", async (request, response) => {
  var tempid = request.params.id;

  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await Post.find({ _id: request.params.id });
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
 * /posts:
 *  get:
 *    tags:
 *      - posts
 *    description: Get all posts
 *    responses:
 *      '200':
 *        description: list of all posts
 */
router.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    var postMap = {};

    posts.forEach(function (post) {
      postMap[post._id] = post;
    });

    res.send(postMap);
  });
});

/**
 * @swagger
 * /posts:
 *  post:
 *    tags:
 *      - posts
 *    description: create a new post
 *    responses:
 *      '200':
 *        description: success message about the new post
 */
router.post("/", (req, res, next) => {
  const mediaItems = new MediaItems({
    _id: new mongoose.Types.ObjectId(),
    UserId: req.body.mediaId.UserId,
    URL: req.body.mediaId.URL,
    ShowOnProfile: req.body.mediaId.ShowOnProfile,
  });

  mediaItems.save().then;

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    Userid: req.body.Userid,
    Text: req.body.Text,
    mediaId: mediaItems._id,
    Keywords: req.body.Keywords,
    Skills: req.body.Skills,
  });

  post.save().then;

  res.status(200).json({
    message: "Handling POST request on /",
    createdPost: post,
  });
});

/**
 * @swagger
 * /posts/{id}:
 *  patch:
 *    tags:
 *      - posts
 *    description: Get information about a single post
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: update an existing post
 */
router.patch("/:id", async (request, response) => {
  try {
    await Post.findByIdAndUpdate(request.params.id, request.body);
    // await Post.save();
    response.send("updated post" + request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
