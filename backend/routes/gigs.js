var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Gig = require("../models/gig");

/**
 * @swagger
 * /gigs/{id}:
 *  get:
 *    tags:
 *      - gigs
 *    description: Get information about a single gig
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: details about a single gig by ID
 */
router.get("/:id", async (request, response) => {
  var tempid = request.params.id;
  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await Gig.find({ _id: request.params.id });
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
 * /gigs:
 *  get:
 *    tags:
 *      - gigs
 *    description: Get all gigs
 *    responses:
 *      '200':
 *        description: a list of gigs
 */
router.get("/", function (req, res) {
  Gig.find({}, function (err, gigs) {
    var gigMap = {};

    gigs.forEach(function (gig) {
      gigMap[gig._id] = gig;
    });

    res.send(gigMap);
  });
});

/**
 * @swagger
 * /gigs:
 *  post:
 *    tags:
 *      - gigs
 *    description: Create a new gig
 *    responses:
 *      '200':
 *        description: successful creation of a new gig
 */
router.post("/", (req, res, next) => {
  const gig = new Gig({
    _id: new mongoose.Types.ObjectId(),
    Userid: req.body.UserId,
    Name: req.body.Name,
    LocationName: req.body.LocationName,
    Location: req.body.Location,
    CompanyName: req.body.CompanyName,
    Timestamp: req.body.Timestamp,
    EventLengthInMinutes: req.body.EventLengthInMinutes,
    Genres: req.body.Genres,
    Skills: req.body.Skills,
    GigType: req.body.GigType,
    RequiredProficiency: req.body.RequiredProficiency,
    Description: req.body.Description,
  });

  gig.save().then;

  res.status(200).json({
    message: "Handling GET request on /",
    createdGig: gig,
  });
});

/**
 * @swagger
 * /gigs/{id}:
 *  patch:
 *    tags:
 *      - gigs
 *    description: Update an existing gig
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Update success with a success message
 */
router.patch("/:id", async (request, response) => {
  try {
    await Gig.findByIdAndUpdate(request.params.id, request.body);
    // await Gig.save();
    response.send("updated Gig" + request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
