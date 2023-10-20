import Express from "express";
import authRouter from './routes/auth.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './dataBase/connection.js'


dotenv.config();
const server = Express()

server.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }
))
server.use(Express.json())
server.use(cookieParser())
server.use("/api", authRouter)

// databse connection
connectDB()

server.get("/",  (req, res) => {
    res.status(201).json({ succes: true })
})

server.listen(8080, () => {
    console.log("server is running..")
})