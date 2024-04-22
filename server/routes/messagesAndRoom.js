const express = require("express");
const router = express.Router();

const firebaseAdmin = require("../fire");
const db = firebaseAdmin.firestore();

// get all room and Last Messages
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const roomsDb = db.collection("rooms");
    const rooms = await roomsDb
      .where("usernames", "array-contains", username)
      .get();
    const roomsList = [];

    for (const doc of rooms.docs) {
      // Generate Username
      const interlocutors = doc
        .data()
        .usernames.find((item) => item !== username);
      // Generate last message
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

      if (Object.keys(lastMessage).length === 0) {
        lastMessage = "click here to say hi.";
      } else {
        if (lastMessage.type === "file") {
          lastMessage = interlocutors + " sent a file";
        } else if (lastMessage.type === "text") {
          lastMessage = limitText(lastMessage.text, 26);
        }
      }
      const data = {
        id: doc.id,
        username: interlocutors,
        lastMessage: lastMessage,
      };
      console.log(data);
      roomsList.push(data);
    }

    res.status(200).send({ message: "success", rooms: roomsList, status: 200 });
  } catch (error) {
    res.status(500).send({ error });
  }
});

function limitText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

module.exports = router;
