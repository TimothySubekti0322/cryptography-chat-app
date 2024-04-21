const express = require("express");
const router = express.Router();

const firebaseAdmin = require("../fire");
const db = firebaseAdmin.firestore();

// get all room
router.get("/", async (req, res) => {
  try {
    const roomsDb = db.collection("rooms");
    const rooms = await roomsDb.get();
    const roomsList = [];
    rooms.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      roomsList.push(data);
    });
    res.status(200).send(roomsList);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// get room by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const roomsDb = db.collection("rooms");
    const room = await roomsDb.doc(id).get();
    res.status(200).send(room.data());
  } catch (error) {
    res.status(500).send({ error });
  }
});

// create room
router.post("/", async (req, res) => {
  try {
    const { username1, username2 } = req.body;

    const roomsDb = db.collection("rooms");

    const roomisExist = await roomsDb
      .where("usernames", "==", [username1, username2])
      .get();
    if (!roomisExist.empty) {
      res.status(200).send({ message: "Room already exists", status: 404 });
      return;
    }
    const response = await roomsDb.add({
      usernames: [username1, username2],
    });

    res.status(200).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
