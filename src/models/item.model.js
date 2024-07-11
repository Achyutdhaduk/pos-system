import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide product name'],
    //maxlength: [50, 'Name can not be more than 50 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0,
  },
  image: {
      type: String,
    },
 stock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  available: {
     type: Boolean,
      default: true },
  
    

},{
    timestamps:true,toJSON: { virtuals: true }, toObject: { virtuals: true } 
});

itemSchema.index({ name: 1 }, { unique: true }); 
// db.items.dropIndex({ name: 1 })
 
export const Item = new mongoose.model("Item", itemSchema);;
