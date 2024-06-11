import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

export {app}