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
    res.status(200).send({ message: "success", rooms: roomsList, status: 200 });
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
    const roomData = {
      id: room.id,
      ...room.data(),
    };

    res.status(200).send({ message: "success", room: roomData, status: 200 });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// create room
router.post("/", async (req, res) => {
  try {
    const { username1, username2 } = req.body;

    const roomsDb = db.collection("rooms");

    // check if room already exists
    const roomisExist = await roomsDb
      .where("usernames", "==", [username1, username2])
      .get();
    if (!roomisExist.empty) {
      res.status(200).send({ message: "Room already exists", status: 404 });
      return;
    }

    // Check if username1 and username2 is exists
    const usersDb = db.collection("users");
    const user1 = await usersDb.doc(username1).get();
    const user2 = await usersDb.doc(username2).get();
    if (!user1.exists || !user2.exists) {
      res.status(200).send({ message: "user not found", status: 404 });
      return;
    }

    const response = await roomsDb.add({
      usernames: [username1, username2],
    });

    const docId = response._path.segments[1];

    const addingMessageSubCollection = await db
      .collection("rooms")
      .doc(docId)
      .collection("messages")
      .add({});

    res.status(200).send({ message: "success", status: 200 });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
