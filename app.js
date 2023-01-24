// const express = require("express"); // Access
// const socket = require("socket.io");

// const app = express(); //Initialized and server ready

// // app.use(express.static("public"));
// app.use(express.static(__dirname));


// let port = process.env.PORT || 5000;
// let server = app.listen(port, () => {
//     console.log("Listening to port" + port);
// })

// let io = socket(server);

// io.on("connection", (socket) => {
//     console.log("Made socket connection");
//     // Received data
//     socket.on("beginPath", (data) => {
//         // data -> data from frontend
//         // Now transfer data to all connected computers
//         io.sockets.emit("beginPath", data);
//     })
//     socket.on("drawStroke", (data) => {
//         io.sockets.emit("drawStroke", data);
//     })
//     socket.on("redoUndo", (data) => {
//         io.sockets.emit("redoUndo", data);
//     })
// })

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */
  // cors:{
  //   origin: "*"
  // },{
    allowEIO3: true // false by default
  // }
  });
// });

app.use(express.static(__dirname));


io.on("connection", (socket) => {
  // ...
  console.log('A user connected');

  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });

 //transfer data to server to another
socket.on("beginPath", (data) => {
  io.sockets.emit("beginPath", data);
});

socket.on("drawStroke", (data) => {
  io.sockets.emit("drawStroke", data);
});

socket.on("redoUndo", (data) => {
  io.sockets.emit("redoUndo", data);
});
});

const port = process.env.PORT || 3000;

httpServer.listen(port);
