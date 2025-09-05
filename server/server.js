import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import'dotenv/config';
import userRouter from './Routes/userRoute.js';
import sellerRouter from './Routes/sellerRoute.js';
const app = express();
const port = process.env.PORT || 3000 ;
//can allow multiple originss
const allowedOrigins = [`http://localhost5173`];
//Middleware Config
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , }));

await connectDB()

app.get('/',(req,res)=>res.send("API IS WORKING"));
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter);
app.listen(port,()=>console.log(` SERVER IS RUNNING ${port}`));
