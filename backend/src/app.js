import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.route.js"
import questionRouter from "./routes/question.route.js"
const app = express()

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))


app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/questions",questionRouter)

export default app