import { Router }from "express";
import { registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    UpdateUserAvatar,
    updateUserCoverImage
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
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-passsword").post(veriftJWT,changeCurrentPassword)
router.route("/current-user").get(veriftJWT,getCurrentUser)
router.route("/update-account").patch(veriftJWT,updateAccountDetails)
router.route("/avatar").patch(veriftJWT,upload.single("avatar"),UpdateUserAvatar)
router.route("/cover-Image").patch(veriftJWT,upload.single("coverImage"),updateUserCoverImage)



export default router
