let express = require("express");
let router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *      - users
 *    description: Get information about a single user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: details about a single user
 */
router.get("/:id", async (request, response) => {
  let tempid = request.params.id;

  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await User.find({ _id: request.params.id });
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
 * /users/{username}/{password}:
 *  get:
 *    tags:
 *      - users
 *    description: Get information about a single user
 *    parameters:
 *      - name: username
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: success message about the login
 */
router.get("/:username/:password", async (request, response) => {
  let username = request.params.username;
  let password = request.params.password;

  // Find the user with the matching username and password
  const user = await User.findOne({ username, password });

  // If no user is found, return false
  if (!user) {
    return response.json({ success: false });
  }

  // If a user is found, return true
  response.json({ success: true });
});

/**
 * @swagger
 * /users/{id}/bookmarks:
 *  get:
 *    tags:
 *      - users
 *    description: Get all bookmarks for a user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: a list of bookmarks
 */
router.get("/:id/bookmarks", async (request, response) => {
  let tempid = request.params.id;

  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await User.find({ _id: request.params.id }).select({
        BookmarkedProfiles: 1,
        BookmarkedGigs: 1,
        BookmarkedMediaItems: 1,
      });
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
 * /users:
 *  get:
 *    tags:
 *      - users
 *    description: get all users
 *    responses:
 *      '200':
 *        description: a list of users
 */
router.get("/", function (req, res) {
  User.find({}, function (err, users) {
    let userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
});

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - users
 *    description: register a new user
 *    responses:
 *      '200':
 *        description: success message for registering a new user
 */
router.post("/", (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Password: req.body.Password,
    EmailId: req.body.EmailId,
    Location: req.body.Location,
    OnboardingReason: req.body.OnboardingReason,
    Keywords: req.body.Keywords,
    Skills: req.body.Skills,
    MusicalExpertise: req.body.MusicalExpertise,
    NotificationPreference: req.body.notificationPreference,
    ProfileCreationDate: req.body.ProfileCreationDate,
    PhotoURL: req.body.PhotoURL,
    Description: req.body.Description,
    Heading: req.body.Heading,
    BookmarkedProfiles: req.body.BookmarkedProfiles,
  });

  user.save().then;

  res.status(200).json({
    message: "Handling GET request on /",
    createdUser: user,
  });
});

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    tags:
 *      - users
 *    description: update information about a single user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: success message about the updated user
 */
router.patch("/:id", async (request, response) => {
  try {
    await User.findByIdAndUpdate(request.params.id, request.body);
    response.send("updated user" + request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
