import { asyncHandler } from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary, deleteFileFromCloudinary} from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  jwt  from "jsonwebtoken";
import mongoose from "mongoose";



const generateAccessAndRefreshTokens = async(userId)=>
    {
        try {
            const user =  await User.findById(userId)
            const accessToken = user.generateAccessToken()
           const refreshToken =  user.generateRefreshToken()
    
           user.refreshToken = refreshToken
           await user.save({validateBeforeSave : false})
    
           return {accessToken,refreshToken}
        } catch (error) 
        {
            throw new ApiError(500,"Something went wrong while generating referesh and access token")
            
        }
    }

    



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





const loginUser = asyncHandler(async(req,res)=>{

    // req body -> data
    // usernaem or email
    // find the user
    // password check
    // access and refresh token
    // send cookie 

     // req body -> data

    const {email,username,password} =req.body
     // usernaem or email

     // if(!(username || email)){throw new ApiError(400,"username or email required")}
    if(!username && !email){
        throw new ApiError(400,"username and password is required")
    }

    // find the user

   const user =  await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

     // password check


   const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404,"Invalid user credentials")
    }


     // access and refresh token
    const {accessToken,refreshToken}= await  generateAccessAndRefreshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


// send cookie

const options ={
    // http only and secure: true  karvathi cookie ma change backend thi thase frontend thi nai kari sakay. frontend thi khali joy sakay
    httpOnly: true, 
    secure : true,
}
// cookie use karva app.js ma app.use cookiparser add karel 6 atle .cookie karine vapari sakayu
return res.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken,
            refreshToken
        },
        "User logged In Successfully"
        
    )
)

}

)


const logoutUser = asyncHandler(async(req,res)=>{
    await  User.findByIdAndUpdate(
         req.user._id,
         {
             $unset:{
                 refreshToken: 1,
             }
         },
         {
             new : true
         }
 
     )
 
     const options = {
         httpOnly : true,
         secure : true
     }
 
     return res
     .status(200)
     .clearCookie("accessToken",options)
     .clearCookie("refreshToken",options)
     .json(new ApiResponse(200,{},"User logged Out"))
 })
 



export{
    registerUser,
    loginUser,
    logoutUser
   
}



