import connectDB from "./config/db.js"
import dotenv from "dotenv"
import app from "./app.js";
import cookieParser from 'cookie-parser'

dotenv.config({
  path:'./env'
})

connectDB()
.then(()=>{
app.on("Error",(err)=>{
  console.log("Error",err)
})

app.use(cookieParser())

  app.listen(process.env.PORT || 9000,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
  })
})
.catch((err)=>{
    console.log("MongoDB Connection Failed",err)
  })