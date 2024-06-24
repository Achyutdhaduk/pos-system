import { Router }from "express";

import { veriftJWT } from "../middlewares/auth.middleware.js";
import { createOrder, deleteallorder, deleteorderbyusername } from "../controllers/order.controller.js";

const router = Router()


router.route("/createorder").post(veriftJWT,createOrder)
// router.route("/deleteallorder/:itemname").delete(veriftJWT,deleteOrderByItemName)
router.route("/deleteallorder/:id").delete(veriftJWT,deleteallorder)
router.route("/deleteallorderbyname/:name").delete(veriftJWT,deleteorderbyusername)


export default router
