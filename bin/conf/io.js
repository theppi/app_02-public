const ioRoutes = require(path.join(__basedir, 'routes', 'io'));

function cleanUp(app) {
    let sockets = app.get("sockets");
    return new Promise((resolve, reject) => {
        for(let i in sockets) {
            if(!sockets[i].connected || sockets[i].disconnected) {
                delete app.get("sockets")[i];
            }
        }
    })
}

module.exports = function(app, io)  {
    app.set("sockets", {});
    
    io.on('connection', function(socket) {
        app.get("sockets")[socket.id] = socket;
        socket.on('disconnect', function(){
            console.log('user disconnected');
            cleanUp(app);
        });
        socket.on('message', function(msg) {
            if(!msg.type || !ioRoutes[msg.type]) {
                socket.emit('message', {error: "no such method"});
            }
            
            console.log(msg);
        })
    });
      
    app.set("io", io);
}