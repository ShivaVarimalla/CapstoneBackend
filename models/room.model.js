const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	description:{
		type:String
	}
})

const Room = mongoose.model('Room',roomSchema);

module.exports = Room;

