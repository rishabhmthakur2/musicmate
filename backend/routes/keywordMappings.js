var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const KeywordMapping = require('../models/keywordMapping');

// Get details of one keywordMapping based on FirstName
router.get("/:id", async (request, response) => {
  var tempid = request.params.id

  if(tempid.length != 24){
    response.status(400).send("Please send a valid id of 24 characters")
  }else{

    try{
      const output = await KeywordMapping.find({_id: request.params.id});
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

// GET listing for all keywordMappings.
router.get('/', function(req, res) {
  KeywordMapping.find({}, function(err, keywordMappings) {
    var keywordMappingMap = {};

    keywordMappings.forEach(function(keywordMapping) {
      keywordMappingMap[keywordMapping._id] = keywordMapping;
    });

    res.send(keywordMappingMap);  
  });
});

// Create a new keywordMapping
router.post('/', (req, res, next) => {
  const keywordMapping = new KeywordMapping({
    Instruments: req.body.Instruments,
    Genres: req.body.Genres
  });

  keywordMapping.save().then;

  res.status(200).json({
    message: 'Handling GET request on /',
    createdKeywordMapping: keywordMapping
  })

});

// Updating a keywordMapping with a given id
router.patch("/:id", async (request, response) => {
  try {
    await KeywordMapping.findByIdAndUpdate(request.params.id, request.body);
    // await KeywordMapping.save();
    response.send("updated keywordMapping"+ request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
