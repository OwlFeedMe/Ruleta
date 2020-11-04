const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');
var crypto = require('crypto');



//settings

app.set('port', process.env.PORT || 3000);

//static files

app.use(express.static(path.join(__dirname, 'public')));

//start the server 

const server = app.listen(app.get('port'), () => {

  console.log('server on port', app.get('port'));

});

const io = SocketIO(server);

var round_id = 0;
function myFunction() {

  let server_seed = "39b7d32fcb743c244c569a56d6de4dc27577d6277d6cf155bdcba6d05befcb34";
  let lotto = "0422262831";
  let hash = server_seed + "-" + lotto + "-" + round_id
  round_id += 1;
  hash = crypto.createHash('md5').update(hash).digest('hex');
  let roll = parseInt(hash.substr(1, 2), 16) % 37;
  console.log(roll);

  io.sockets.emit('resultado', roll,segs);
}



myFunction();
var segs = 45;
setInterval(function () {
  segs -= 0.1;
  seg = '' + segs;
  //if (segs < 10) { console.log(seg.substr(0, 3)); } else { console.log(seg.substr(0, 4)); }

}, 100);


setInterval(function () {
  segs = 45;

  myFunction();
}, 40000);

io.on('connection', (socket) => {

  console.log('te conectaste crack', socket.id);

  io.sockets.emit('tiempo', segs);
})