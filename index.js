// RUN seeds.js in before running the app to set up a TEST user
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.js'
import transactionRoutes from './routes/transaction.js'
import statsRoutes from './routes/stats.js'
dotenv.config()
const app = express()

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())

app.use('/auth',authRoutes);
app.use('/transaction', transactionRoutes)
app.use('/stats',statsRoutes)

mongoose
    .connect(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>
        app.listen(process.env.PORT,()=>console.log(`Database connected! and listening to Port ${process.env.PORT}`))
    ).catch((error)=>console.log(error));

