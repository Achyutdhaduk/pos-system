import {Item} from "../models/item.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

const addItem = asyncHandler(async(req,res)=>{

    const {name,price,category,description,available} = req.body

    // console.log(JSON.stringify(req.body)+"wsedrtyujijuhgfds");
    // if (
    //     [ name, price, category].some((field) =>
    //         field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }
    if ([name, price, category].some(field => typeof field === 'string' && field.trim() === '')) {
        throw new ApiError(400, "All fields are required")
      }


    const existedItem = await Item.findOne({
        name,
    })
    if (existedItem) {
        throw new ApiError(409, "item  already Exists")
    }

    const addItem = await Item.create({
        name,
        price,
        category,
        description,
        available   
    })

   if(!addItem){

    throw new ApiError(500,"something went wrong while adding Item")
   } 

   return res.status(201).json(
    new ApiResponse(200,addItem,"Item Added Succesfully")
   )

})

const updateItem = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const { name, price, category, description, available } = req.body;




const item = await Item.findById(id);
if (!item) {
  return res.status(404).json({ error: 'Item not found.' });
}

item.name = name;
item.price = price;
item.category = category;
item.description = description;
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

    const {id} = req.params
    if(!id){
        throw new ApiError(500, "item-id not found from url for Deleting ");
    }

    const item = await Item.findById(id);

    if (!item) {
        throw new ApiError(404, "item not found for deleting");
    }

    // if (Item.owner.toString() !== req.user._id.toString()) {
    //     throw new ApiError(401, "Unauthorized to delete this item");
    // }


    const deletedItem = await Item.findByIdAndDelete(id);

    

    if (!deletedItem) {
        throw new ApiError(500, "Error while deleting item");
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

        
    const {id} = req.params
    if(!id){
        throw new ApiError(500, "item-id not found from url for fetch-item ");
    }

       const item = await Item.findById(id)
       if (!item) {
        throw new ApiError(404, "item not found for fetching-item");
    }


       res.status(200).json(item) 
    } catch (error) {
        throw new ApiError(500, error.message || "Error while deleting item");
    }
})


 
export {addItem,updateItem,deleteitem,getallitems,getitem} 
