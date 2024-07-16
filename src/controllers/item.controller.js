import {Item} from "../models/item.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { uploadOnCloudinary, deleteFileFromCloudinary } from "../utils/cloudnary.js";

// const addItem = asyncHandler(async(req,res)=>{

//     const {name,price,category,description,available} = req.body

//     // console.log(JSON.stringify(req.body)+"wsedrtyujijuhgfds");
//     // if (
//     //     [ name, price, category].some((field) =>
//     //         field?.trim() === "")
//     // ) {
//     //     throw new ApiError(400, "All fields are required")
//     // }
//     if ([name, price, category].some(field => typeof field === 'string' && field.trim() === '')) {
//         throw new ApiError(400, "All fields are required")
//       }

    
//     // const existedItem = await Item.findOne({
        
//     //     $or: [{ name },{category}]

//     // })
//     // console.log(existedItem+"ertgtrs");
//     // if (existedItem) {
//     //     throw new ApiError(409, "item  already Exists")
//     // }

//     const existedItem = await Item.findOne({ name ,category});
//     console.log(existedItem + "ertgtrs");
//     if (existedItem!=null) {
//         throw new ApiError(409, "Item already exists with the same name and category");
//     }
  
//     console.log({name,price});
//     const addItem = await Item.create({
//         name,
//         price,
//         category,
//         description,
//         available   
//     })
   

//    if(!addItem){

//     throw new ApiError(500,"something went wrong while adding Item")
//    } 

//    return res.status(201).json(
//     new ApiResponse(200,addItem,"Item Added Succesfully")
//    )

// })

const addItem = asyncHandler(async (req, res) => {
    const { name, price, category,type,ingredients,shopid,image,size, available } = req.body;


    const itemimageLocalPath = req.files?.image[0]?.path;
    
    if (!itemimageLocalPath) {
        throw new ApiError(400, "Item image Localfile is required");
    
    }
 
     const itemimage1 = await uploadOnCloudinary(itemimageLocalPath);

    
console.log(itemimage1.url);


    // Validate required fields
    if ([name, price, category].some(field => typeof field === 'string' && field.trim() === '')) {
        throw new ApiError(400, "All fields are required");
    }

    // Check for existing item with the same name and category
    const existedItem = await Item.findOne({ name });
 
    if (existedItem) {
        throw new ApiError(409, "Item already exists with the same name and category");
    }
    console.log("Aaaaaaaaaaaaa");

    // Add new item
    
    try {
        const newItem = await Item.create({
            name,
            price,
            available,
            type,
            ingredients,
            shopid,
            size,
            image:itemimage1.url,
            category
        });
      
        console.log(newItem);
        if (!newItem) {
            throw new ApiError(500, "Something went wrong while adding the item");
        }

        return res.status(201).json(
            new ApiResponse(200, newItem, "Item added successfully")
        );
    } catch (error) {

        throw new ApiError(500, error.message || "Something went wrong while adding the item");
    }
});

// module.exports = addItem;


const updateItem = asyncHandler(async(req,res)=>{
    const {itemnametoupdate} = req.params
    const { name, price, category, available } = req.body;



const item = await Item.findOne({name:itemnametoupdate});
if (!item) {
  return res.status(404).json({ error: 'Item not found.' });
}

item.name = name;
item.price = price;
item.category = category;

item.available = available;

try {

    
    const updateItem = await item.save();

    if (!updateItem) {
        throw new ApiError(500, "Error while updating item");
    }

    
    res
    .status(200)
    .json(new ApiResponse(200, updateItem, "item name and description updated successfully"));

    
} catch (error) {

    throw new ApiError(500, error.message || "Error while updating item ");
    
}
})


const deleteitem = asyncHandler(async(req,res)=>{
try {

    const {itemid} = req.params
    
   // console.log(itemtodelete);
    /*if(!itemtodelete){
        throw new ApiError(500, "item-id not found from url for Deleting ");
    }
   */
   // const item = await Item.findOne(itemtodelete);
   // const item = await Item.findOne({name:itemtodelete});
  
     // console.log(item+"aaaaaaaaaaaa");
    // const itemid = item._id;
    console.log(itemid);
    if (!itemid) {
        throw new ApiError(404, "item-id not found for deleting");
    }
   
    const deletedItem = await Item.findByIdAndDelete({_id:itemid});
    if (!deletedItem) {
        throw new ApiError(404, "Item not found for deleting");
    }
    
    res.status(200).json(new ApiResponse(200, {}, "item deleted successfully"));

    
} catch (error) {
    throw new ApiError(500, error.message || "Error while deleting item");
}


})



const getallitems = asyncHandler(async(req,res)=>{
    try {
       const item = await Item.find({})
       res.status(200).json(item) 
    } catch (error) {
        throw new ApiError(500, error.message || "Error while deleting item");
    }
})
const getitem = asyncHandler(async(req,res)=>{
    try {

        
    const {name} = req.params
    if(!name){
        throw new ApiError(500, "item-id not found from url for fetch-item ");
    }

       const item = await Item.findOne({name:name})
       if (!item) {
        throw new ApiError(404, "item not found for fetching-item");
    }


       res.status(200).json(item) 
    } catch (error) {
        throw new ApiError(500, error.message || "Error while deleting item");
    }
})


 
export {addItem,updateItem,deleteitem,getallitems,getitem} 
