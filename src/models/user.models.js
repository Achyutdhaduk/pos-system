import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const userSchema = new Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            require:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String, //cloudinary url
            require:true,
        },
        coverImage:{
            type:String, //cloudnary url
        },
        
        password:{
            type:String,
            required:[true,'Password is Required']
        },
        refreshToken:{
            type:String,
        }

        
    },
    {
        timestamps:true
    })



    userSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();
        
        this.password = await bcrypt.hash(this.password,10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrpt.compare(password,this.password)
}    



userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,
        
    },
    process.env.Access_TOKEN_SECRET,{
        expiresIn:process.env.Access_TOKEN_EXPIRY
    
    }
    )
        }
        userSchema.methods.generateRefreshToken = function(){return jwt.sign({
            _id:this.id,
           
            
        },
        process.env.Access_TOKEN_SECRET,{
            expiresIn:process.env.Access_TOKEN_EXPIRY
        
        }
        )}


    export const User = new mongoose.model("User", userSchema)