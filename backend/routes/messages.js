var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/message");
const Users = require("../models/user");

/**
 * @swagger
 * /messages/chatlist/{id}:
 *  get:
 *    tags:
 *      - messages
 *    description: Get all users the given user is talking to
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: list of users that the user is talking to
 */
router.get("/chatlist/:id", async (request, response) => {
  const tempid = request.params.id;
  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const resultOne = await Message.distinct("receiver_id", {
        sender_id: tempid,
      });
      const resultTwo = await Message.distinct("sender_id", {
        receiver_id: tempid,
      });
      const combinedArr = resultOne.concat(resultTwo);
      const uniqueArr = combinedArr.filter(
        (value, index) => combinedArr.indexOf(value) === index
      );
      try {
        response.status(200).send(uniqueArr);
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
 * /messages/{id}:
 *  get:
 *    tags:
 *      - messages
 *    description: Get messages for a user
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: list of messages for a user
 */
router.get("/:id", async (request, response) => {
  var tempid = request.params.id;
  console.log({ tempid });
  if (tempid.length != 24) {
    response.status(400).send("Please send a valid id of 24 characters");
  } else {
    try {
      const output = await Message.find({
        $or: [
          { sender_id: request.params.id },
          { receiver_id: request.params.id },
        ],
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
 * /messages/{sender_id}/{receiver_id}:
 *  get:
 *    tags:
 *      - messages
 *    description: Get messages between two users
 *    parameters:
 *      - name: sender_id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      - name: receiver_id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: list of messages between two users
 */
router.get("/:senderid/:receiverid", async (request, response) => {
  try {
    const senderId = request.params.senderid;
    console.log(senderId);

    const receiverId = request.params.receiverid;
    console.log(receiverId);

    const messagesAtoB = await Message.find(
      {
        $or: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId },
        ],
      },
      {
        sender_id: 1,
        receiver_id: 1,
        message_content: 1,
        sent_at: 1,
        _id: 0,
      }
    ).sort({ sent_at: -1 });
    console.log(messagesAtoB);

    const outputSender = await Users.find({ _id: request.params.senderid });
    senderName = outputSender[0]["FirstName"];

    const outputReceiver = await Users.find({ _id: request.params.receiverid });
    receiverName = outputReceiver[0]["FirstName"];

    const finalResult = {
      senderName: senderName,
      receiverName: receiverName,
      messages: messagesAtoB,
    };

    try {
      response.status(200).send(finalResult);
    } catch (error) {
      response.status(500).send(error);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 * @swagger
 * /messages:
 *  post:
 *    tags:
 *      - messages
 *    description: Create a new message
 *    responses:
 *      '200':
 *        description: success message for successful creation
 */
router.post("/", (req, res, next) => {
  const msg = new Message({
    _id: new mongoose.Types.ObjectId(),
    sender_id: req.body.senderId,
    receiver_id: req.body.receiverId,
    message_content: req.body.messageContent,
  });

  msg.save().then;

  res.status(200).json({
    message: "Handling GET request on /",
    createdMessage: msg,
  });
});

module.exports = router;
