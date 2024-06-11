import { asyncHandler } from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary, deleteFileFromCloudinary} from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  jwt  from "jsonwebtoken";
import mongoose from "mongoose";



const registerUser  = asyncHandler(async (req,res)=>{
    
    // --get user details from frontend
     
    const {fullName, email, username, password} = req.body
    //console.log("email:",email)
    //console.log(req.body);

    // -- validation – not empty

    if(
        [fullName,email,username,password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    // --check if user already exists:username,email

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already Exists")
    }

    // --check for images, check for avatar

   

        const avatarLocalPath = req.files?.avatar[0]?.path; 
   
//   //  const coverImageLocalPath = req.files?.coverImage[0]?.path;
   
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }
  

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // --upload them to cloudinary , avatar

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar-cloud file is required")
    }

    // --create user object – create entry in db
    
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage.url || "",
        email,
        password,
        username:username.toLowerCase()

    })
    
    // --remove password and refresh token field from response

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // --check for user creation

    if(!createUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    // --Retrun res
    
    return res.status(201).json(
        new ApiResponse(200, createUser,"User registered Successfully")
    )
})



export{
    registerUser,
   
}