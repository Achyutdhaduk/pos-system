import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
     type: String,
      required: true,
      
      },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description:{
    type:String
},
  available: {
     type: Boolean,
      default: true },
  
    

},{
    timestamps:true
});
itemSchema.index({ name: 1 }, { unique: true }); 
// db.items.dropIndex({ name: 1 })
 
export const Item = new mongoose.model("Item", itemSchema);;
