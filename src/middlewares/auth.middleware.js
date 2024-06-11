import { asyncHandler } from "../utils/asynchandler.js  ";
import { ApiError } from "../utils/ApiError.js";
// import { jwt } from "jsonwebtoken";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

// auth middleware check karse user login 6 ke nai
//-- sacha  jwtToken hase e login hase

export const veriftJWT = asyncHandler(async(req, _,next)=>{
  try {
     const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
  

    //mobile app cookie ma no hoy tyare header ma thi leva (replace atla mate karyu ke bearer pachi space hase to ama accessToken nahi hoy atle ane empty kari nakhyu)


      if(!token){
          throw new ApiError(401,"Unauthorized request")
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
       if(!user){
          throw new ApiError(401,"Invalid Access Token")
       }
  
       req.user = user;
       next()
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token")
  }

})