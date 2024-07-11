import { asyncHandler } from "../utils/asynchandler.js";
import { Item } from "../models/item.model.js";
import {Itemorder} from "../models/order.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createOrder = asyncHandler(async(req,res)=>{
    try {

        const { items, customerName } = req.body;

        
        if (!items || !items.length) {
            return res.status(400).json({ error: 'Items are required to create an order.' });
          }

          

          let itemname;
          let totalAmount = 0;
        //  for (let i = 0; i < items.length; i++) {
        //     const item = items[i];
        //     if (!item.itemId || !item.quantity || !item.price) {
        //       return res.status(400).json({ error: 'Item details are required to create an order.' });
        //     }
        //   }
          for (const item of items) {
           //   const itemDetails = await Item.findById(item.itemId);
             const itemDetails =  await Item.findOne({name:item.itemname})
            
               if (!itemDetails) {
               return res.status(404).json({ error: `Item with ID ${item.itemId} not found.` });
               }
            totalAmount += item.quantity * itemDetails.price;
             
               itemname=itemDetails.name
              
          }

          // console.log(totalAmount);
       
          
      
          // Create a new item order
          const newOrder = await Itemorder.create({
            items,
            totalAmount,
            customerName,
            itemname
          });
          // console.log(newOrder+"Aaaaaaa");
          const savedOrder = await newOrder.save();
          
      
       
         

          if(!savedOrder){
            throw new ApiError(500, "Error while CREATING OREDER ");
          }

          return res.status(201).json({ message: 'Order created successfully.' });
   
   
        
    } catch (error) {
        throw new ApiError(500, error.message || "Error while CREATING OREDER "); 
    }
})

/*
const deleteallorder = asyncHandler(async(req,res)=>{

    const {itemname} = req.params
      ;
    const order = await Itemorder.findOne({ "items.itemname": itemname });
  
    if (!order) {
      throw new ApiError(404, `Order containing item with name ${itemname} not found`);
  }

  const deletedOrder = await Itemorder.findByIdAndDelete(order._id);
  if (!deletedOrder) {
      throw new ApiError(500, "Error while deleting order");
  }
  res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));

   
    

})
*/
/*

const deleteOrderByItemName = asyncHandler(async (req, res) => {
  try {
      const { itemname } = req.params;

      if (!itemname) {
          throw new ApiError(400, "Item name not found in URL for deleting order");
      }

      // Use aggregation to find the order that contains the specified item name
     
      const order = await Itemorder.aggregate([
        { $unwind: "$items" },
        { $match: { "items.itemname": itemname } },
        { $group: { _id: "$_id" } },
        { $limit: 1 }
    ]);
      console.log();
      if (!order || order.length === 0) {
          throw new ApiError(404, `Order containing item with name ${itemname} not found`);
      }

      // Delete the order
      const deletedOrder = await Itemorder.findByIdAndDelete(order[0]._id);
      if (!deletedOrder) {
          throw new ApiError(500, "Error while deleting order");
      }

      res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
  } catch (error) {
      if (error instanceof ApiError) {
          res.status(error.statusCode).json({ message: error.message });
      } else {
          res.status(500).json({ message: error.message || "Error while deleting order" });
      }
  }
});*/

/* 
const deleteOrderByItemName = asyncHandler(async (req, res) => {
    try {
      const { itemname } = req.params;

      if (!itemname) {
          throw new ApiError(400, "Item name not found in URL for deleting order");
      }

      // Find orders that contain the specified item name
      const orders = await Itemorder.find({ "items.itemname": itemname });

      
      if (!orders.length) {
          throw new ApiError(404, `Order containing item with name ${itemname} not found`);
      }

      // Assume we want to delete the first order found
      const orderId = orders[0]._id;
      const deletedOrder = await Itemorder.findByIdAndDelete(orderId);
      if (!deletedOrder) {
          throw new ApiError(500, "Error while deleting order");
      }

      res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
  } catch (error) {
      if (error instanceof ApiError) {
          res.status(error.statusCode).json({ message: error.message });
      } else {
          res.status(500).json({ message: error.message || "Error while deleting order" });
      }
  }
});*/



const deleteallorder = async (req, res) => {


    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Item id not found in URL for deleting order");
    }
   
    
    const result = await Itemorder.findByIdAndDelete(id);
   
    if (!result) {
        throw new ApiError(500, "Error while deleting order");
    }

    res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
};  
/*
const deleteorderbyusername = asyncHandler(async(req,res)=>{

    const {username} = req.params

    if(!username){
        throw new ApiError(500, "username not found from url for deleting order ");
    }

    const order = await Itemorder.findByIdAndDelete({customerName:username});

    if (!order) {
        throw new ApiError(404, "Order not found for deleting");
    }

    res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));

})
*/

const deleteorderbyusername = asyncHandler(async (req, res) => {

    const { name } = req.params;

    if (!name) {
        throw new ApiError(400, "Username not found in URL for deleting order");
    }
    

    const order = await Itemorder.findOne({ customerName: name });

    if (!order) {
        throw new ApiError(404, `Order with username ${name} not found`);
    }

    const deletedOrder = await Itemorder.findByIdAndDelete(order._id);

    if (!deletedOrder) {
        throw new ApiError(500, "Error while deleting order");
    }

    res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));

});


const updateOrder = asyncHandler(async(req,res)=>{

  const { name } = req.params;

    
  if (!name) {
      throw new ApiError(400, "Username not found in URL for deleting order");
  }
  

  const order = await Itemorder.findOne({ customerName: name });

  if (!order) {
      throw new ApiError(404, `Order with username ${name} not found`);
  }




  const updatedOrder = await Itemorder.findByIdAndUpdate(order._id, req.body, { new: true });

  if (!updatedOrder) {

      throw new ApiError(500, "Error while updating order");
  }

  res.status(200).json(new ApiResponse(200, updatedOrder, "Order updated successfully"));

})

export {createOrder,
    deleteallorder,
    deleteorderbyusername}