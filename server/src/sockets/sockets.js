module.exports = function (io) {

    io.on('connection', (socket) => {
        console.log("New connection:", socket.id);
    
        socket.on('chat:message', (data) => {
            /* console.log(data) */

            io.sockets.emit('new:message',data);
        });
    })
}