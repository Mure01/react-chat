const userModel = require("../Models/userModel");
const messagesModel = require('../Models/messageModel');
const registerUser = async  (req, res) => {
    const { username, email, password } = req.body;

    const emailExists = await userModel.findOne({email})

    if(emailExists)
        return res.json({msg: "Email is already used", status: false})

    const usernameExists = await userModel.findOne({username})

    if(usernameExists)
        return res.json({msg: "Username is already used", status: false})


    const user = new userModel({username, email,  password});
    await user.save()
    user.password ="";
    return res.json({status:true, user})
}
const loginUser = async  (req, res) => {
    const { username, password } = req.body;

    const usernameExists = await userModel.findOne({username})
    if(!usernameExists)
        return res.json({msg: "Username doesn't exist", status: false})
    if(usernameExists.password !== password)
        return res.json({msg:"Invalid Password" , status :false })

    usernameExists.password ="";

    return res.json({status:true, user: usernameExists})
}

const getAllUsers = async (req,res) => {
    const users = await userModel.find();
    res.json(users)
}
const addMessage = async (req, res) => {
    console.log(req.body)
    const {reciver, sender, message} = req.body
    const newMessage = new messagesModel({
        sender: sender,
        reciver: reciver,
        message: message
    })
    await newMessage.save()
    const allMessage = await messagesModel.find()
    res.json({mess: "Message added", allMessage})
}
const getMessage = async (req, res) => {
    const allMessage = await messagesModel.find()
    res.json({mess: "Message returned", allMessage})

}
module.exports =  {registerUser, loginUser,getMessage, addMessage, getAllUsers}