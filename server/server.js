import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app); // server instance

const io = new Server(server, {
  // socket server instance
  cors: {
    origin: "*",
  },
});

// creating connection this will accept the "connect" emit from the browser
io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log("call user emited", { userToCall, signalData, from, name });
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    console.log("answercall triggered");
    io.to(data.to).emit("callAccepted", data.signal);
  });
});


server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

// socket.join(userToCall);
// console.log(roomId, userId);
// socket.to(roomId).emit("user-joined", { userId, roomId });
