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

// image upload
const storage = require("./storage");
const upload = require("./upload");

const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");
const messageRoutes = require("./routes/messages");

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

  socket.on("push-message", (message) => {
    console.log(`📩: ${message}`);
    socket.emit("feedback", "Message received");
  });
});

app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);

app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Try Upload
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
