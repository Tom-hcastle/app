const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "<http://localhost:3000>",
    }
});

const generateID = () => Math.random().toString(36).substr(2, 9);

let chatRooms = [
    {
        id: generateID(),
        name: "Room 1",
        messages: [
            {
                id: generateID(),
                message: "Hello World",
                time: "12:00",
                user: "John Doe",
            },
            {
                id: generateID(),
                text: "Hi Tom, thank you",
                time: "12:10",
                user: "Ron",
            },
        ],
    },
];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('createRoom', (roomName) => {
        socket.joinRoom(roomName);
        chatRoom.unshift({id: generateID(), name: roomName, messages: []});
        socket.emit("roomsList", chatRooms);
    });

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        socket.emit("findRoom", id);
        socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    }, []);

    useEffect(() => {
        socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    }, [socket])

    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('🔥: A user disconnected');
      });
});

app.get("/api", (req, res) => {
    res.json(chatRooms);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});