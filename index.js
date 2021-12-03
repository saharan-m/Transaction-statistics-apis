// RUN seeds.js in before running the app to set up a TEST user

import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.js'
import transactionRoutes from './routes/transaction.js'
import statsRoutes from './routes/stats.js'

const app = express()

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())

app.use('/auth',authRoutes);
app.use('/transaction', transactionRoutes)
app.use('/stats',statsRoutes)

mongoose
    .connect('mongodb://localhost:27017/auth',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>
        app.listen(5000,()=>console.log('Database connected!'))
    ).catch((error)=>console.log(error));

