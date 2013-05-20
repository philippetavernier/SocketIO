//Sending over serial OK
// If the slider value is no going to quick or range
//value is not to big.
//To DO
//------
//Add a feedback or update to all open browser!!
//Smartphone webkit
//proxy the port to 80


var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

//var SerialPort, port, serial;
//SerialPort = require('serialport').SerialPort
var sys=require("sys");
var serial = require( "serialport" );
var SerialPort = serial.SerialPort;
var port = '/dev/ttyUSB0';
express = require('express') // require for writing on serial port
//serial = null;

//var interval = null;
var interval = 10;

io.set('log level', 0);
    var sp = new SerialPort(port, {
      baudrate: 9600,
      parser  :serial.parsers.readline( "\r\n" )
    });

  fs.stat(port, function(err, stats) {
    if (err != null) {
      console.log("Couldn't stat " + port);
      process.exit();
    }
    console.log("Started.");

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
    sp.on( "data", function ( data ) {
      console.log( data );
      //if(err) console.log(err);
      //socket.emit( "message", data.toString() );
      //sys.puts("here: " +data);
    } );

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
        sp.write("x"+parseInt(msg));    //ok if we don't use the slider to quickly 
                                            //parseInt for sending a integer on the serial
        //clearInterval(interval);
    });
    socket.on('browser slider2', function (msg) {
    //message dans le terminal
        console.log("DATA!!on!!serial");    
        console.log("y"+msg);
        //send_serial(msg);
        clearInterval(interval);
        sp.write("y"+parseInt(msg));    //ok if we don't use the slider to quickly
        //clearInterval(interval);
    });
});
//socket.on('monEvenement', maFonction);
