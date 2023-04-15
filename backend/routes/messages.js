var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const Message = require('../models/message');

// Get all messages of one user 
router.get("/:id", async (request, response) => {
  var tempid = request.params.id

  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters")
  } else {

    try {
      const output = await Message.find({ sender_id: request.params.id });
      try {
        response.status(200).send(output);
      } catch (error) {
        response.status(500).send(error);
      } ß
    } catch (error) {
      response.status(500).send(error);
    }
  }


});

// Get all messages between one user and another
router.get("/:sender_id/:receiver_id", async (request, response) => {

  try {
    const output = await Message.find({ sender_id: request.params.sender_id, receiver_id: request.params.receiver_id })
    try {
      response.status(200).send(output);
    } catch (error) {
      response.status(500).send(error);
    }
  } catch (error) {
    response.status(500).send(error);
  }



});

// get all the users this person is chatting with
router.get("/chatlist/:id", async (request, response) => {
  var tempid = request.params.id

  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters")
  } else {

    try {
      // const output = await Message.find({ sender_id: request.params.id });
      const result = await Message.distinct("receiver_id", { sender_id: tempid });
      console.log(result);
      try {
        response.status(200).send(result);
      } catch (error) {
        response.status(500).send(error);
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }


});

// // GET listing for all users.
// router.get('/', function(req, res) {
//   User.find({}, function(err, users) {
//     var userMap = {};

//     users.forEach(function(user) {
//       userMap[user._id] = user;
//     });

//     res.send(userMap);  
//   });
// });

// Create a new message
router.post('/', (req, res, next) => {
  const msg = new Message({
    _id: new mongoose.Types.ObjectId(),
    sender_id: req.body.senderId,
    receiver_id: req.body.receiverId,
    message_content: req.body.messageContent
  });

  msg.save().then;

  res.status(200).json({
    message: 'Handling GET request on /',
    createdMessage: msg
  })

});

module.exports = router;
