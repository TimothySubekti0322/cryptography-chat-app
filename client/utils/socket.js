import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android"
    ? "http://192.168.0.108:3000/"
    : "http://localhost:3000";

// const socket = io.connect("http://192.168.0.108:4000/");
const socket = io.connect(
  "https://cryptography-instant-messanging-app.fly.dev"
);

export default socket;
