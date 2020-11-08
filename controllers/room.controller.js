const {Room} = require('../models');

exports.create = async (req,res)=>{
	let {name,description}=req.body;
	//validation.
	let err=[]
	if(name.length<3) err.push('room length should be greater than 3');
	if(err.length>0) return res.json({err});
	//encrypting the password
	let newRoom=new Room({
		name,
		description
	})
	//saving the user to database
	newRoom.save()
	.then(user=>{
		res.status(200).json({
			text:`${name} is created`,
			data:newRoom
		})
	}).catch(err=>{
		res.json({
			text:'error',
			err,
		})
	})
}

exports.getAllRooms = async (req,res)=>{
	try {
		let response = await Room.find();
		res.status(200).json({
			message:'all Rooms',
			body:response
		})
	} catch(e) {
		console.log(e);
		res.json({
			message:'some error occured!..'
		})
	}
}