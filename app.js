//require all packages that are necessary.
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {Message} = require('./models');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//required middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',require('./routes/user.route'));
app.use('/room',require('./routes/room.route'));
app.use('/messages',require('./routes/message.route'));
//connecting to database
(async ()=>{
	try {
		await mongoose.connect(`mongodb+srv://Shiva:Shiva@cluster0.bh870.mongodb.net/cluster0?retryWrites=true&w=majority`);
		console.log('connected to database!...');
	} catch(e) {
		console.log(e);
	}
})();

app.get('/',(req,res)=>res.send('this is home page!.'));

io.on('connect', (socket) => {
	// to join a room
	socket.on('join', ({ name, room }, callback) => {
	    const { error, user } = addUser({ id: socket.id, name, room });

	    if(error) return callback(error);

	    socket.join(user.room);

	    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
	    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

	    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

	    callback();
  	});
  	//
	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		let newMessage = new Message({
			text:message,
			user: user.name,
			room:user.room
		})

		newMessage.save();

		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

http.listen(3000,()=>console.log('Server running at port 3000.....!'));
