var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://saopx02:rtyfgh@ds125994.mlab.com:25994/chatdb";
var dbControl = require('./GetMongoDB');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.get('/chat', function(req, res){
	res.sendFile(__dirname + '/public/chat.html');
});

app.post('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.post('/chat', function(req, res){
	res.sendFile(__dirname + '/public/chat.html');
});

// Đăng ký các sự kiện của socket
io.on('connection', function(socket){
	dbControl.GetAllMessage().then(function(items){
		socket.emit('load', items);
	}, function(err){
		console.log('Error 2: '+err);
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		insertDB(msg);
	});
	socket.on('load', function(msg){
		
	});
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});

function insertDB(message){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var obj = {"message" : message};
		db.collection("customers").insertOne(obj, function(err, res){
			if (err) {
				console.log('Erorr: '+err);
			}
		});
	});
}