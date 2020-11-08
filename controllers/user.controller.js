const {User} = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
//register  a user
exports.register = async (req,res)=>{
	let {username,password,email}=req.body;
	//validation.
	let err=[]
	if(password.length<6) err.push('password length should be greater than 6');
	let usernameExists=await User.findOne({username})
	if(usernameExists) err.push('this is username already exists')
	if(!email) err.push('invalid email id!')
	if(err.length>0) return res.json({err});
	//encrypting the password
	let salt = await bcryptjs.genSalt(10)
	let newUser=new User({
		username,
		password:await bcryptjs.hash(password,salt),
		email
	})
	//saving the user to database
	newUser.save()
	.then(user=>{
		res.status(200).json({
			text:`${username} is registerd`,
			data:user
		})
	}).catch(err=>{
		res.json({
			text:'error',
			err,
		})
	})
}
//login user
exports.login = async (req,res)=>{
	let {username,password}=req.body;
	//validation
	let usernameFound = await User.findOne({username});
	if(!usernameFound) return res.send({err:`Account with username ${username} doesn't exist.`});
	let validPassword = await bcryptjs.compare(password,usernameFound.password);
	if(!validPassword) return res.send({err:'Incorrect password'});

	//creating a token
	let token = await jwt.sign(
		{
			id:usernameFound._id,
			username
		},
		'IAmAbsolute',
	)

	res.status(200).json({
		msg:'login sucessfull!',
		token
	})
}
//logout user
exports.logout = (req,res)=>{
	res.clearCookie('token');
    res.status(200).send({ message: 'Logged out' });
}
//get all users
exports.getAllUsers = async (req,res)=>{
	try {
		let response = await User.find();
		res.status(200).json({
			message:'all users',
			body:response
		})
	} catch(e) {
		console.log(e);
		res.json({
			message:'some error occured!..'
		})
	}
}
exports.myProfile = async (req,res)=>{
	try {
	let response = await User.findOne({_id:req.user.id});
	res.status(200).json({
	message:'My Profile',
	body:response
	})
	} catch(e) {
	console.log(e);
	res.json({
	message:'some error occured!..'
	})
	}
	} 
