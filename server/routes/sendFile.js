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
      res.status(400).send({ message: "Room ID is required", status: 400 });
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
      res.status(400).send({ message: "Sender is required", status: 400 });
      return;
    }
    if (!req.file) {
      res.status(400).send({ message: "No file uploaded", status: 400 });
      return;
    }

    // upload file to cloudinary
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const uploadResponse = await storage.uploader.upload(file);

    const encryptedFileBase64 = encrypt.encrypt64(fileBase64);

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


const { decode, encode } = require('base-64')

const encrypt = {
  encryptText: (message, e, n) => {
    cypher = "";
    let messageAscii = "";
    const nLength = n.toString().length;
    let asciiBlock = 0n;

    for (let i = 0; i < message.length; i++) {
      messageAscii += (message.charAt(i)).charCodeAt().toString().padStart(3, "0");
    }

    while (messageAscii !== "") {
      asciiBlock = BigInt(messageAscii.substr(0, 4).padEnd(4, "0"));
      messageAscii = messageAscii.slice(4);
      cypher += encrypt.exponent(asciiBlock, e, n).toString().padStart(nLength, "0");
    }
    return encode(cypher);
  },

  encrypt64: (message, e, n) => {
    const messageText = (decode(message));
    return encryptText(messageText, e, n);
  },

  exponent: (base, exponent, modulus) => {
    if (modulus === 0n || modulus === 1n) return 0n;

    let result = 1n;
    base = base % modulus;

    // pangkatkan
    while (exponent > 0n) {
      if (exponent % 2n === 1n) {
        result = (result * base) % modulus;
      }
      exponent = exponent / 2n;
      base = (base * base) % modulus;
    }

    return result;
  }
}

module.exports = router;
