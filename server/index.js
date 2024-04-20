const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://10.0.2.2:3000/",
  },
});

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const multer = require("multer");

const storage = require("./storage");
const upload = require("./upload");

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

  socket.on("push-message", (message) => {
    console.log(`📩: ${message}`);
    socket.emit("feedback", "Message received");
  });
});

app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    console.log(file);

    const uploadResponse = await storage.uploader.upload(file);

    console.log(uploadResponse.url);
    res.status(200).send({ uploadResponse: uploadResponse });
  } catch (error) {
    res.status(500).send(error);
  }
});

http.listen(PORT, () => {
  console.log(`Server is listeing on ${PORT}`);
});
