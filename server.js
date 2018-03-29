var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var io = require("socket.io")();
var cookieParser = require("cookie-parser");
mongoose.connect('mongodb://127.0.0.1:27017/flat_find');
// for auth 
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var User = require("./server/models/User.js");
var Room = require("./server/models/Room.js");
var Student = require("./server/models/Student.js");
var Message = require("./server/models/Message.js");
var Flat = require("./server/models/Flat.js");
var cron = require('cron');
  





var app = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }));
// for auth
app.use(cookieParser());
app.use(session({ secret: 'your secret here',
	resave:  true,
	saveUninitialized: true,
	key: 'jsessionid',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));




// app.post('/api/smartchat', function(req, res, next){
// 	var job1 = new cron.CronJob({
//   cronTime: '* * * * * *',
//   onTick: function() {
//     Flat.findOne().exec(function(err, flat){
//     	if(err){
//     		return res.status(400).send(error);
//     	}else{
//     		console.log(flat);
//     		return res.send(flat);
//     		// return;
//     		// res.end();
//     	}
//     })
//   },
//   start: false
// });

// job1.start();


// 		// new CronJob('* * * * * *', function() {
// 		// 		console.log('You will see this message every second');
// 		// }, null, true, 'Almaty/Kazakhstan');

// 	// if(req.body.validation = true){
// 	// }
// });


app.get('/api/rooms/:user_id', (req, res, next)=>{
	User.findById(req.params.user_id).populate('rooms')
		.exec((err, user) => {
			if(err) return res.send(err);
			if(!user) return res.send(400);
			var rooms = user.rooms.filter(function(room){
				return room.accepted;
			});

			res.send(rooms);
		});
});

app.get('/api/rooms/all/:room_id', (req, res, next)=>{
	Room.find(req.params.room_id)
		.exec((err, room) => {
			if(err) return res.send(err);
			else{
				res.status(200).send(room);
			}
		});
});

app.post('/api/rooms/:user_id', (req, res, next) =>{
	User.findById(req.params.user_id)
		.exec((err, user)=>{
			if(err) return res.send(err);

			var room = new Room({
				title: req.body.title,
				reciever: req.body.user,
				group_room: req.body.group_room
			});

			room.save((err, room) => {
				if(err) return res.send(401);
				user.rooms.push(room);
				user.save((err, user)=>{
					if(err) return res.send(err);
					if(Array.isArray(req.body.user)){
						for(let a = 0; a<req.body.user.length; a++){
							io.sockets.emit(req.body.user[a], {
								room: room,
								user_id: user._id,
								reciever: req.body.user[a],
								type: 0,
								group_room: room.group_room,
								sender_name: req.body.sender_name
							});
						}	
					}else{
						console.log(req.body.sender_name+"<=====ETO sender_name");
						io.sockets.emit(req.body.user, {
								room: room,
								user_id: user._id,
								reciever: req.body.user,
								type: 0,
								group_room: room.group_room,
								sender_name: req.body.sender_name
						});
					}
					
					res.send(200);
				});
			});
		});
});

app.put('/api/rooms/:room_id', (req, res, next)=>{
	console.log(req.body.user);
	User.findById(req.body.user)
		.exec(function(err, user){
			if(err) return res.send(err);
			user.rooms.push(req.params.room_id);
			user.save(function(err){
				if(err) return res.send(err);
				Room.findById(req.params.room_id)
					.exec(function(err, room){
						if(err) return res.send(err);
						room.accepted = true;
						room.save(function(err){
							if(err) return res.send(err);
							else{
								io.sockets.emit('updatechat', 'SERVER', 'Студент принял запрос! Желаем приятного диалога:)');
								io.sockets.emit(req.body.user, {room: room, type: 1});
								io.sockets.emit(req.body.user_id, {room: room, type: 1});
								res.send(200);
							}
						});
					});
			});
		})
});


app.get('/api/messages/:room_id', function(req, res, next){
	Message.find({room: req.params.room_id}).populate("room").populate("user")
		.exec(function(err, messages){
			if(err) return res.send(err);
			res.send(messages);
		});
});

// app.post('/api/messages/:room_id', function(req, res, next){
// 	var message = new Message({
// 		to: req.body.to,
// 		text: req.body.text,
// 		user: req.body.user,
// 		room: req.params.room_id
// 	});

// 	message.save(function(err, message){
// 		if(err) return res.send(err);
// 		else{
// 			res.status(200).send(message);
// 			io.sockets.to(req.params.room_id).emit('receive_message', message);
// 		}
// 	});

// });





app.use(require("./server/routes"));


var server = app.listen(3000, function(){
  console.log("Express server running on port 3000");
});


var socketServer = io.attach(server);

	io.sockets.on('connection', function(socket){


		socket.on('newmessage', function(data){
			var message = new Message({
				author: data.username,
				text: data.text,
				user: data.user,
				room: data.room
			});

			message.save(function(err, message){
				if(err) return res.send(err);
				else{
					console.log()
					io.sockets.emit('updatechat', message.author, message.user ,message.text);
				}
			});
			
		});



		socket.on('self_connect', function(data){
			socket.join(data.user_id);
		});



		socket.on('connect_rooms', function(data){
			for(let i = 0; i < data.rooms.length; i++) {
				if(data.rooms[i].accepted) {
					socket.join(data.rooms[i]._id);
				}
			}
		});



		socket.on('room_connect', function(data){
			socket.join(data.id);
		});

		// socket.on('newmessage', function(data){
		// 	new Message({
		// 		user: socket.username, 
		// 		text: data.text,
		// 		room: req.params.room_id
		// 	}).save(function(err, message){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		else{
		// 			io.sockets.in(socket.room).emit('updatechat', socket.username, data.text);
		// 		}
		// 	});
			
		// });

	});
