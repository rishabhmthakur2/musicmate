let express = require("express");
let router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");
const Post = require("../models/post");
const Gig = require("../models/gig");

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
 * /users/login:
 *  post:
 *    tags:
 *      - users
 *    description: Pass username and password in the req body to login
 *    responses:
 *      '200':
 *        description: success message about the login
 */
router.post("/login", async (request, response) => {
  // Find the user with the matching username and password
  const user = await User.findOne({
    EmailId: request.body.username,
    Password: request.body.password,
  });
  // If no user is found, return false
  if (!user) {
    return response.json({ success: false, userid: -1 });
  }
  // If a user is found, return true
  response.json({ success: true, userid: user._id });
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

// Pulling the feed by combining gigs and posts based on the city the user is in.
router.get("/:id/feed", async (request, response) => {
  let tempid = request.params.id;
  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await User.find({ _id: request.params.id });
      const city = output[0]["Location"]["city"];
      const usersInSameCity = await User.find({ "Location.city": city }, "_id");
      const userIds = usersInSameCity.map((user) => user._id.toString());
      const posts = await Post.find({ Userid: { $in: userIds } });
      const gigs = await Gig.find({ Userid: { $in: userIds } });

      const formattedPosts = await Promise.all(
        posts.map(async (post) => {
          var tempUserId = post.Userid;
          const output = await User.find({ _id: tempUserId });
          var fullName = output[0]["FirstName"] + " " + output[0]["LastName"];
          return {
            type: "post",
            data: post,
            timestamp: post.Timestamp,
            fullName: fullName,
          };
        })
      );

      const formattedGigs = await Promise.all(
        gigs.map(async (gig) => {
          var tempUserId = gig.Userid;
          const output = await User.find({ _id: tempUserId });
          var fullName = output[0]["FirstName"] + " " + output[0]["LastName"];
          return {
            type: "gig",
            data: gig,
            timestamp: gig.Timestamp,
            fullName: fullName,
          };
        })
      );

      const combinedPosts = formattedPosts
        .concat(formattedGigs)
        .sort((a, b) => {
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampB - timestampA;
        });

      try {
        response.status(200).json(combinedPosts);
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
    LocationFlag: req.body.LocationFlag,
    OnboardingReasons: req.body.OnboardingReasons,
    OnboardingFlag: req.body.OnboardingFlag,
    Genres: req.body.Genres,
    GenresFlag: req.body.GenresFlag,
    Skills: req.body.Skills,
    SkillsFlag: req.body.SkillsFlag,
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
    console.log({ data: request.body });
    await User.findByIdAndUpdate(request.params.id, request.body);
    response.send("updated user" + request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *      - users
 *    description: delete a user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: success message about the deletion
 */
router.delete("/:id", async (request, response) => {
  try {
    await User.findByIdAndRemove(request.params.id);
    response.send("Deleted user " + request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
