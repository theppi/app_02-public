const ioRoutes = require(path.join(__basedir, 'routes', 'io'));

module.exports = function(app, io)  {
    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on("message", function(msg) {
            if(!ioRoutes[msg.type]) {
                socket.emit("message", "No such message type.");
                return;
            }
            socket.emit("message", "Message received.");
            ioRoutes[msg.type](socket, msg);
;        });
    });

    app.use(function(req, res, next) {
        req.io = io;
        next();
    })
}