import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
 import { Category } from "../models/category.model.js";
 const addcategory = asyncHandler(async (req, res) => {
    const { category, type } = req.body;

    if (!category) {
        throw new ApiError(400, "Category name is required");
    }

    try {
        const existingCategory = await Category.findOne({ category });
        if (existingCategory) {
            throw new ApiError(400, "Category already exists");
        }

        const newCategory = await Category.create({
            category,
            type
        });

        console.log(newCategory + "aaaaaaaaa");
        if (!newCategory) {
            throw new ApiError(500, "Something went wrong while adding the category");
        }

        return res.status(201).json(
            new ApiResponse(200, newCategory, "Category added successfully")
        );
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while adding the category");
    }
});

const getcategories = asyncHandler(async (req, res) => {

    try {
        const categories = await Category.find();
        return res.status(200).json(
            new ApiResponse(200, categories, "Categories fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while fetching categories");
    }

});

const get_type_category = asyncHandler(async(req,res)=>{
    const {category} = req.params
    const type = await Category.findOne({category : category})
    
    let myjson= JSON.stringify(type.type)
   
    myjson = myjson.slice(1)    
    myjson =myjson.slice(0, myjson.length - 1).split("#")
    res.send(myjson)
    return res.status(200).json()
    
})

export{
    addcategory,
    getcategories,
    get_type_category
}