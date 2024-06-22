import { Router }from "express";

import { veriftJWT } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";

const router = Router()


router.route("/createorder").post(veriftJWT,createOrder)



export default router
