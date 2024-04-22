const express = require("express");
const router = express.Router();

const firebaseAdmin = require("../fire");
const db = firebaseAdmin.firestore();

// image upload
const storage = require("../storage");
const upload = require("../upload");

router.post("/:roomId", upload.single("file"), async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      res.status(200).send({ message: "Room ID is required", status: 400 });
      return;
    }

    // check if room exists
    const roomReference = await db.collection("rooms").doc(roomId).get();

    if (!roomReference.exists) {
      res.status(200).send({ message: "Room not found", status: 404 });
      return;
    }

    // check if sender is provided
    const { sender } = req.body;
    if (!sender) {
      res.status(200).send({ message: "Sender is required", status: 400 });
      return;
    }
    if (!req.file) {
      res.status(200).send({ message: "No file uploaded", status: 400 });
      return;
    }

    // upload file to cloudinary
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const uploadResponse = await storage.uploader.upload(file);

    const encryptedFileBase64 = fileBase64;

    const encryptedFile = `data:${req.file.mimetype};base64,${encryptedFileBase64}`;

    const encryptedUploadResponse = await storage.uploader.upload(
      encryptedFile
    );

    const encryptedFileName =
      req.file.originalname.split(".")[0] +
      "_encrypted" +
      "." +
      req.file.originalname.split(".")[1];

    const messageData = {
      sender: sender,
      type: "file",
      fileName: req.file.originalname,
      url: uploadResponse.url,
      fileNameCipher: encryptedFileName,
      urlCipher: encryptedUploadResponse.url,
      createdAt: new Date().toISOString(),
    };

    // Save message to firestore

    const saveToFireStore = await db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add(messageData);

    res.status(200).send({
      message: "success",
      messageData: messageData,
      status: 200,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
