import { Router }from "express";
import { registerUser,
    loginUser,
    logoutUser
 } from "../controllers/user.controller.js";
import multer from "multer";
import {upload} from "../middlewares/multer.middleware.js"
import { veriftJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
        name:"avatar",
        maxCount:1
        },  
        {
        name:"coverImage",
        maxCount:1,
    } 
    ]),registerUser)

router.route("/login").post(loginUser)
router.route("/logout").post( veriftJWT,logoutUser)



export default router
