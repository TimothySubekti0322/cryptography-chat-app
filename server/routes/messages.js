const express = require("express");
const router = express.Router();

const firebaseAdmin = require("../fire");
const db = firebaseAdmin.firestore();

// get all messages

router.get("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomReference = db.collection("rooms").doc(roomId);
    if (!roomReference.exists) {
      res.status(404).send({ message: "Room not found" });
      return;
    }

    const messages = roomReference.collection("messages");

    if (!messages.exists) {
      res.status(200).send({ messages: [], status: 404 });
      return;
    }

    const messagesList = [];
    const messagesData = await messages.get();
    messagesData.forEach((doc) => {
      messagesList.push(doc.data());
    });

    res.status(200).send(messagesList);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
