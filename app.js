const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

io.on("connection", function(socket) {
    
    socket.on("send-location", function(data) {
        io.emit("recieve-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });

    // console.log("Connected");
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000);