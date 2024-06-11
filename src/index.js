
//require ('dotenv').config({path:'./env'})
//env variable reload karva mate (jyare index file banse tyare reload thase)
import dotenv from "dotenv"
dotenv.config({path:"./.env"});
import mongoose  from "mongoose";
import {DB_NAME} from "./constants.js";
import {app} from './app.js'
import connectDB from "./db/index.js";



connectDB()
.then(()=>{
  app.listen(process.env.PORT||8000,()=>{
    console.log(`App is listening on port ${process.env.PORT }`)
  })
})
 .catch((err)=>{
  console.log("mongodb connection failed: ", err);
})











/*
import express from "express"
const app = express()


(async () => {
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      //jyare databse connect thay pan app listen no kari sake tyare app.on use karvnu
      app.on("error",()=>{
        console.log("ERR:",error);
        throw error
      })

      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT }`)
      })
    } catch (error) {
        console.error("ERROR: ", error);
        throw err        
    }
})()*/