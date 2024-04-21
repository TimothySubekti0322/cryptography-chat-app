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

const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");
const messageRoutes = require("./routes/messages");
const sendFileRoutes = require("./routes/sendFile");

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
app.use("/send-file", sendFileRoutes);


app.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to the API" });
});


http.listen(PORT, () => {
  console.log(`Server is listeing on ${PORT}`);
});
