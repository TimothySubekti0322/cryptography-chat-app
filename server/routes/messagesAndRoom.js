const express = require("express");
const router = express.Router();

const firebaseAdmin = require("../fire");
const db = firebaseAdmin.firestore();

// get all room and Last Messages
router.get("/", async (req, res) => {
  try {
    const roomsDb = db.collection("rooms");
    const rooms = await roomsDb.get();
    const roomsList = [];

    for (const doc of rooms.docs) {
      const messages = await roomsDb
        .doc(doc.id)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();
      let lastMessage = {};
      messages.forEach((doc) => {
        lastMessage = doc.data();
        console.log("lastMessage = ", lastMessage);
      });
      const data = {
        id: doc.id,
        ...doc.data(),
        lastMessage: lastMessage,
      };
      roomsList.push(data);
    }

    console.log("Checkpoint 2");

    res.status(200).send({ message: "success", rooms: roomsList, status: 200 });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
