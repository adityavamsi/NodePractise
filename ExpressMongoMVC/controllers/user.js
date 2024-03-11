const User = require("../models/dataConnect");

async function getAllUsers(req,res){
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function getUserById(req,res){
    const userId = req.params.id;
        const user = await User.findById(userId);
        return res.json(user);
}
async function postUserById(req,res){
    const body = req.body;
    const user = await User.create({...body});
    return res.status(201).json({status:"created"});
}
async function updateUserById(req,res){
    const body = req.body;
        await User.findByIdAndUpdate(req.params.id,body);
        return res.json({msg : "updated"});
}
async function deleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg:"deleted successfully.."});
}
module.exports = {
    getAllUsers,
    getUserById,
    postUserById,
    updateUserById,
    deleteUserById
}