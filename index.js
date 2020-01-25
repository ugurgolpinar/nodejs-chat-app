const express = require("express");
const socket = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
});

const io = socket(server);

io.on("connection", (socket) => {
    //console.log("Socket bağlantısı yapıldı.", socket.id);
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on("yaziyor", (data) => {
        socket.broadcast.emit("yaziyor", data);
    });
});