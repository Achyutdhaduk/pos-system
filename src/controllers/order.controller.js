import { asyncHandler } from "../utils/asynchandler.js";
import { Item } from "../models/item.model.js";
import {Itemorder} from "../models/order.model.js"

const createOrder = asyncHandler(async(req,res)=>{
    try {

        const { items, customerName } = req.body;

        
        if (!items || !items.length) {
            return res.status(400).json({ error: 'Items are required to create an order.' });
          }

          


          let totalAmount = 0;
        //  for (let i = 0; i < items.length; i++) {
        //     const item = items[i];
        //     if (!item.itemId || !item.quantity || !item.price) {
        //       return res.status(400).json({ error: 'Item details are required to create an order.' });
        //     }
        //   }
          for (const item of items) {
             const itemDetails = await Item.findById(item.itemId);
             
               if (!itemDetails) {
               return res.status(404).json({ error: `Item with ID ${item.itemId} not found.` });
               }
            totalAmount += item.quantity * item.price;
           
          }

        //   console.log(totalAmount+"aaaaaaaaaaa");
          
      
          // Create a new item order
          const newOrder = new Itemorder({
            items,
            totalAmount,
            customerName
          });
          const savedOrder = await newOrder.save();
          


          //

          if(!savedOrder){
            throw new ApiError(500, "Error while CREATING OREDER ");
          }

          return res.status(201).json({ message: 'Order created successfully.' });
   
   

        
    } catch (error) {
        throw new ApiError(500, error.message || "Error while CREATING OREDER "); 
    }
})

export {createOrder}