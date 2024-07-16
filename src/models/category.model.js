

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    
    category: {
      type: String,
      required: [true, 'Please provide product category'],
    },
    type:{
      type:String,
    }
  },{
    timestamps:true,//toJSON: { virtuals: true }, toObject: { virtuals: true } 
});


// db.items.dropIndex({ name: 1 })
 
export const Category = new mongoose.model("Category", CategorySchema);
