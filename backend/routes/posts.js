var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const Post = require('../models/post');

// Get details of one post based on FirstName
router.get("/getPost/:id", async (request, response) => {
  var tempid = request.params.id

  if(tempid.length != 24){
    response.status(400).send("Please send a valid id of 24 characters")
  }else{

    try{
      const output = await Post.find({_id: request.params.id});
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

// GET listing for all posts.
router.get('/postsList', function(req, res) {
  Post.find({}, function(err, posts) {
    var postMap = {};

    posts.forEach(function(post) {
      postMap[post._id] = post;
    });

    res.send(postMap);  
  });
});

// Create a new post
router.post('/createNewPost', (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    Userid: req.body.Userid,
    Text: req.body.Text,
    mediaId: req.body.mediaId,
    Timestamp: req.body.Timestamp,
    Keywords: req.body.Keywords,
    Skills: req.body.Skills
  });

  post.save().then;

  res.status(200).json({
    message: 'Handling GET request on /',
    createdPost: post
  })

});

// Updating a post with a given id
router.patch("/updatePost/:id", async (request, response) => {
  try {
    await Post.findByIdAndUpdate(request.params.id, request.body);
    // await Post.save();
    response.send("updated post"+ request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
