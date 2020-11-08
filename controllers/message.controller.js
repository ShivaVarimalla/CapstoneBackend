const {Message} = require('../models');

//fetching the chat history for a particular room
exports.getMessagesInRoom = async (req,res)=>{
	try {
		let response = await Message.find({room:req.params.room});
		res.status(200).json({
			message:'all messages in '+req.params.room,
			body:response
		})
	} catch(e) {
		console.log(e);
		res.json({
			message:'some error occured!..'
		})
	}
}