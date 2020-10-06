const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function(){
    console.log('Listning on port' +port);

    io.on('connection', function(socket){
        console.log('User Connected');

        //handle a new message

        socket.on('new:message', function(msgObject){
            io.emit('new:message', msgObject);
        });

        //new joined
        socket.on('new:member', function(name){

            io.emit('new:member', name);
        });
    })
});