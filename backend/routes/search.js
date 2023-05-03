let express = require("express");
let router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");
const Gig = require("../models/gig");
const MediaItem = require("../models/mediaItem");
const post = require("../models/post");

/**
 * @swagger
 * /search:
 *  post:
 *    tags:
 *      - search
 *    description: search for content
 *    responses:
 *      '200':
 *        description: a list of items relevant to the search
 */
router.post("/", async (req, res, next) => {
  let searchTypes = [];
  searchTypes = req.body.searchTypes; // allowed types: ["Gigs", "People", "Posts"]
  const searchText = req.body.searchText;
  let result = {};

  if (searchTypes.includes("People")) {
    let query = {
      $or: [
        {
          FirstName: { $regex: searchText, $options: "i" },
        },
        {
          LastName: { $regex: searchText, $options: "i" },
        },
        {
          Genres: { $regex: searchText, $options: "i" },
        },
        {
          Skills: { $regex: searchText, $options: "i" },
        },
        {
          OnboardingReasons: { $regex: searchText, $options: "i" },
        },
      ],
    };
    const users = await User.find(query);
    result["users"] = users;
  }

  if (searchTypes.includes("Gigs")) {
    let query = {
      $or: [
        {
          Name: { $regex: searchText, $options: "i" },
        },
        {
          LocationName: { $regex: searchText, $options: "i" },
        },
        {
          Genres: { $regex: searchText, $options: "i" },
        },
        {
          Skills: { $regex: searchText, $options: "i" },
        },
        {
          GigType: { $regex: searchText, $options: "i" },
        },
        {
          RequiredProficiency: { $regex: searchText, $options: "i" },
        },
        {
          Description: { $regex: searchText, $options: "i" },
        },
      ],
    };
    const gigs = await Gig.find(query);
    result["gigs"] = gigs;
  }

  if (searchTypes.includes("Posts")) {
    let query = {
      $or: [
        {
          Text: { $regex: searchText, $options: "i" },
        },
        {
          Genres: { $regex: searchText, $options: "i" },
        },
        {
          Skills: { $regex: searchText, $options: "i" },
        },
      ],
    };
    const posts = await post.find(query);
    result["posts"] = posts;
  }

  res.status(200).send(result);
});

module.exports = router;
