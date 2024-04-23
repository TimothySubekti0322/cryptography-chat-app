const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");
const messageRoutes = require("./routes/messages");
const sendFileRoutes = require("./routes/sendFile");
const messageAndRoomRoutes = require("./routes/messagesAndRoom");

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

  socket.on("push-message", (message) => {
    console.log(`📩: ${message}`);
    io.emit("feedback", "Message received");
  });

  socket.on("messageFromClient", (message) => {
    console.log("Message from client is Arrived at server", message);
    console.log("Message ID Room", message.idRoom);
    socket.emit("broadcastFromServer", message);
    // io.emit("messageFromServer", message);
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);
app.use("/send-file", sendFileRoutes);
app.use("/rooms-and-messages", messageAndRoomRoutes);

app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

http.listen(PORT, () => {
  console.log(`Server is listeing on ${PORT}`);
});
