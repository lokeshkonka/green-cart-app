import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 4000 ;
//can allow multiple originss
const allowedOrigins = [`http://localhost5173`];
//Middleware Config
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , }));



app.get('/',(req,res)=>res.send("API IS WORKING"));

app.listen(port,()=>console.log(` SERVER IS RUNNING ${port}`));
