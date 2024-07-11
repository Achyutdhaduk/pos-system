import mongoose, { Schema } from "mongoose";

const ItemorderSchema = new Schema(
  {
    customer: {
      type: String,
    },
    country: {
      type: String,
      required: true
    },
    zipcode: {
      type: Number,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          // required: true,
        },
        itemname:{
          type: String,
        
          // required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
       
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      require: true 
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Itemorder = new mongoose.model("Itemorder", ItemorderSchema);
