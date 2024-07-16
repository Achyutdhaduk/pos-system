import { Router }from "express";
import { addcategory ,getcategories,get_type_category} from "../controllers/category.controller.js";
import { veriftJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()


router.route("/addcategory").post(veriftJWT,addcategory)
router.route("/getcategories").get(getcategories)
router.route("/get_type_category/:category").get(get_type_category)


export default router
