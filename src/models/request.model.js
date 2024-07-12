import mongoose,{Schema} from "mongoose";


const userrequestSchema = new Schema({
   ownername:{
        type:String 
       
    },
    owneremail:{
    
        type:String
    },
    shopname:{
        type: String,
    },
    shopaddress:{
        type: String,
    },
    shopdetails:{
        type: String,
    },
    contactno:{
        type: Number,
    },
    pincode:{
        type: Number,
    },  
    userid:{
        type: mongoose.Schema.Types.ObjectId, // Assuming userid should be an ObjectId
        required: true,
        ref: 'User'
    },
    city:{
        type: String,
    },
},{timestamps:true,toJSON: { virtuals: true }, toObject: { virtuals: true }});

export const request = new mongoose.model("request", userrequestSchema);