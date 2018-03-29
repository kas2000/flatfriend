
module.exports = function(io){
	io.sockets.on('connection', function(socket){

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

	});
}
