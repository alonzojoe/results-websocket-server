const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
});
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log(`connected: ${socket.id}`);

    socket.on('releaseResult', (patient) => {
        io.emit('resultReleased', patient);
    });

    socket.on('cancelResult', (patient) => {
        io.emit('resultCancelled', patient);
    });

    socket.on('disconnect', (socket) => {
        console.log(`disconnected: ${socket.id}`);
    });
});

const port = 9001;

server.listen(port, () => {
    console.log(`WebSocket server listening to ${port}`);
});
