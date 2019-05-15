// ***************************************
var express = require('express');
var http = require('http');
// nos permite manejar paths sin depender de la plataforma (OS)
var path = require('path');

var io = require('socket.io');
var connections = 0;

// ***************************************
// vamos a crear el servidor de http
var app = express();
var server = http.createServer(app);


// ***************************************
// servir recursos estaticos
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
// usaremos un lenguaje de templating: EJS
app.set('view engine', 'ejs');
// usaremos stylus preprocesador de css que trae express predeterminado
app.use(require('stylus').middleware(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public')));


// ***************************************
// rutas - html
app.get('/',function(req, res){
    res.render('index',{title:'Dibujemos'});
});

// io.set('log level', 1);

// ***************************************
// creamos un servidor de sockets
io = io.listen(server);



// ***************************************
// escuchamos conexiones entrantes
io.sockets.on('connection', function (socket){
    connections++;
    console.log('connected', connections);
    socket.broadcast.emit('connections', {connections:connections});

    // detectamos evento de mouse
    socket.on('mousemove',function (data){
        // transmitimos el movimiento a todos los clientes conectados
        socket.broadcast.emit('move',data);
    });

    socket.on('disconnect', function(){
        connections--;
        console.log('connected', connections);
        socket.broadcast.emit('connections',{connections:connections});
    });
});


server.listen(app.get('port'), function(){
    console.log('Express server listening on port' + app.get('port'));
});













