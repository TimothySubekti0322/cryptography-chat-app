const express = require("express");
const router = express.Router();

const firebaseAdmin = require("../fire");
const db = firebaseAdmin.firestore();

// get all messages

router.get("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomReference = await db.collection("rooms").doc(roomId).get();

    if (!roomReference.exists) {
      res.status(200).send({ message: "room doesn't exist", status: 404 });
      return;
    }

    const messages = await db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .get();

    const messagesList = [];
    messages.forEach((doc) => {
      messagesList.push(doc.data());
    });

    messagesList.splice(messagesList.length - 1);

    messagesList.reverse();

    res
      .status(200)
      .send({ message: "success", data: messagesList, status: 200 });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// add message
router.post("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { sender, message, cipher } = req.body;

    const roomReference = await db.collection("rooms").doc(roomId).get();

    if (!roomReference.exists) {
      res.status(200).send({ message: "Room not found", status: 404 });
      return;
    }

    const response = await db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        sender: sender,
        type: "text",
        message: message,
        cipher: cipher,
        createdAt: new Date(),
      });

    res.status(200).send({ message: "Success", status: 200 });
  } catch (error) {
    console.log("error = ", error);
    res.status(500).send({ error });
  }
});

module.exports = router;
