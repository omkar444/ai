import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()

connectDB()
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//api
app.use("/api/v1/user",userRoutes)


app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`)
})