var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const Gig = require('../models/gig');

// Get details of one Gig based on FirstName
router.get("/getGig/:id", async (request, response) => {
  var tempid = request.params.id

  if(tempid.length != 24){
    response.status(400).send("Please send a valid id of 24 characters")
  }else{

    try{
      const output = await Gig.find({_id: request.params.id});
      try {
        response.status(200).send(output);
      } catch (error) {
        response.status(500).send(error);
      }
    }catch(error){
      response.status(500).send(error);
    }
  }
  
  
});

// GET listing for all Gigs.
router.get('/GigsList', function(req, res) {
  Gig.find({}, function(err, gigs) {
    var gigMap = {};

    gigs.forEach(function(gig) {
      gigMap[gig._id] = gig;
    });

    res.send(gigMap);  
  });
});

// Create a new Gig
router.post('/createNewGig', (req, res, next) => {
  const gig = new Gig({
    _id: new mongoose.Types.ObjectId(),
    Userid: req.body.UserId,
    LocationName: req.body.LocationName,
    Location: req.body.Location,
    Timestamp: req.body.Timestamp,
    EventLengthInMinutes: req.body.EventLengthInMinutes,
    Keywords: req.body.Keywords,
    Skills: req.body.Skills,
    GigType: req.body.GigType,
    RequiredProficiency: req.body.RequiredProficiency,
    Description: req.body.Description
  });

  gig.save().then;

  res.status(200).json({
    message: 'Handling GET request on /',
    createdGig: gig
  })

});

// Updating a Gig with a given id
router.patch("/updateGig/:id", async (request, response) => {
  try {
    await Gig.findByIdAndUpdate(request.params.id, request.body);
    // await Gig.save();
    response.send("updated Gig"+ request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
