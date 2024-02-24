const userModel = require("../Models/userModel");


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
    console.log(users)
    res.json(users)
}

module.exports =  {registerUser, loginUser, getAllUsers}