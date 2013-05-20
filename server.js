//Sending over serial OK
//To DO
//------
//Add a feedback or update to all open browser!!
//Smartphone webkit
//proxy the port to 80


var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

var SerialPort, port, serial;
SerialPort = require('serialport').SerialPort
port = '/dev/ttyUSB0';
express = require('express') // require for writing on serial port
serial = null;

var interval = null;

  fs.stat(port, function(err, stats) {
    if (err != null) {
      console.log("Couldn't stat " + port);
      process.exit();
    }
    console.log("Started.");
    serial = new SerialPort(port, {
      baudrate: 9600
    });
    return app.listen(8080);
    console.log("server create on port 8080")
  });

//app.listen(8080);


function handler (req, res) {
  fs.readFile(__dirname + '/slider-br.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading slider.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}



// Serial function not receiving msg param
/*send_serial= function (msg) {
//   lightOn2 = false;
    return serial.write("x"+msg);
    console.log("x"+msg)
  };
*/

//var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.on('browser button', function (msg) {
    //message dans le terminal
        console.log("DATA!");
        console.log(msg);
    });
    socket.on('browser slider1', function (msg) {
    //message dans le terminal
        console.log("DATA!!on!!serial");    
        console.log("x"+msg);
        //send_serial(msg);
        clearInterval(interval);
        serial.write("x"+msg);    //ok if we don't use the slider to quickly
    });
    socket.on('browser slider2', function (msg) {
    //message dans le terminal
        console.log("DATA!!on!!serial");    
        console.log("y"+msg);
        //send_serial(msg);
        clearInterval(interval);
        serial.write("y"+msg);    //ok if we don't use the slider to quickly
    });
});
//socket.on('monEvenement', maFonction);
