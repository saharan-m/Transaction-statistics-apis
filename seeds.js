import User from './models/user.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose
    .connect(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>
       console.log('Connected to the Database!')
    ).catch((error)=>console.log(error));

const userName = 'test1'
const password = 'test1'
const hashedPassword = await bcrypt.hash(password,12);
const user = {
    userName,
    password:hashedPassword
}
const result = new User(user);
result.save().then(()=>console.log('User Created')).catch(err=>console.log(err.message))