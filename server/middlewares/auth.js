const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require('../models/User');

//auth

exports.auth=(req,res,next) =>{
    //step
    //fetch token (3method are available)
    //header,body,cookies
    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer"," ")

    //if token is missing then return error res(401)
    if(!token || token === undefined)
    {
        return res.status(403).json({
            success:false,
            message:"Token Missing!"
        })
    }
    //if token found -- verify token
    try{
        //create payload using verify method jwt
        console.log("auth middleware token ",token);
        const value= process.env.JWT_SECRET;
        console.log("value",value)
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload);
        req.user = payload;
    }
    catch(err){// if token is tempered...
        return res.status(401).json({
            success:false,
            message:"token invalid"
        })
    }
    next();
}




//isStudent

exports.isStudent= (req,res,next) =>{
    try{
        // step
        //check user role
        if(req.user.role !== "Student")
        {
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student only"
            })
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"unverified user role !"
        })
    }
    next();
}




//isInstructor


exports.isInstructor= (req,res,next) =>{
    try{
        // step
        //check user role
        if(req.user.role !== "Instructor")
        {
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Instructor only"
            })
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"unverified user role !"
        })
    }
    next();
}


//isAdmin

exports.isAdmin= (req,res,next) =>{
    try{
        // step
        //check user role
        if(req.user.role !== "Admin")
        {
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Admin only"
            })
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"unverified user role !"
        })
    }
    next();
}

