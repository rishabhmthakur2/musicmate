let express = require("express");
let router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");
const Gig = require("../models/gig");
const MediaItem = require("../models/mediaItem");

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
router.post("/", (req, res, next) => {
  const searchType = req.body.searchType; // allowed types: "gigs", "users", "mediaItems"
  const searchFilter = req.body.searchFilter;

  if (searchType == "users") {
    User.find(
      {
        $or: [
          {
            FirstName: req.body.searchText,
          },
          {
            LastName: req.body.searchText,
          },
        ],
        $and: [
          { genre: searchFilter.genre },
          { experienceLevel: searchFilter.experienceLevel },
          { lookingToPlay: searchFilter.lookingToPlay },
          { musicalSkill: searchFilter.musicalSkill },
        ],
      },
      function (err, users) {
        let userMap = {};
        users.forEach(function (user) {
          userMap[user._id] = user;
        });

        res.send(userMap);
      }
    );
  } else if (searchType === "gigs") {
    Gig.find(
      {
        name: req.body.searchText,
        $and: [
          { GigType: searchFilter.employmentType },
          { RequiredProficiency: searchFilter.experienceLevel },
        ],
      },
      function (err, gigs) {
        let gigsMap = {};
        gigs.forEach(function (gig) {
          gigsMap[gig._id] = gig;
        });

        res.send(gigMap);
      }
    );
  } else if (searchType === "mediaItems") {
    MediaItem.find(
      {
        Name: req.body.searchText,
      },
      function (err, mediaItems) {
        let mediaMap = {};
        mediaItems.forEach(function (media) {
          mediaMap[media._id] = media;
        });

        res.send(mediaMap);
      }
    );
  }
});

module.exports = router;
