import { Router }from "express";
import { addItem, deleteitem, getallitems, getitem, updateItem } from "../controllers/item.controller.js";
import { veriftJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/additem").post(veriftJWT,addItem)
router.route("/updateitem/:itemnametoupdate").patch(veriftJWT,updateItem)
router.route("/deleteitem/:itemtodelete").delete(veriftJWT,deleteitem)
router.route("/getallitem").get(veriftJWT,getallitems)
router.route("/getitem/:name").get(veriftJWT,getitem)


export default router
