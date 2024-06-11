import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// json mathi data leva
app.use(express.json({limit:"16kb"}))
// url mathi + ,%20 avu clean karva mate (url mathi data leva)
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//express ma public file store karva mate(local storage)
app.use(express.static("public"))
// server - user broeser ma cookie  set karva and aceess karva
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'

//router declaration
app.use("/api/v1/users",userRouter)



export {app}

