// require ('dotenv').config({path: './env'})

// import mongoose from 'mongoose'
// import { DB_NAME } from './constants';
import connectDb from './db/index.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
})


connectDb();


























// import express from 'express'
// const app = express()

                        // ;(async()=>{
                        //  try {
                        //     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
                        //     app.on("error",(error)=>{
                        //         console.log("errrr", error)
                        //         throw error
                        //     })

                        //     app.listen(process.env.PORT,()=>{
                        //         console.log(`app is listening on port ${process.env.PORT}`);

                        //     })
                        //  } catch (error) {
                        //     console.log("error :",error);
                        //     throw error

                        //  }
                        // })()