import express from 'express'
import dotenv from 'dotenv'
import connectDb from "./config/db.js"
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

let app = express()
let PORT = process.env.PORT ||4000;

app.use(express.json())
app.use(cookieParser())

app.use("/api", authRouter)

app.listen(PORT,()=>{
    connectDb()
    console.log(`server is started at ${PORT}`)
})