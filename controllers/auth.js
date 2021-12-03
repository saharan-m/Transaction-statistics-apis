import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const login = async(req,res)=>{
    const {userName,password} = req.body;
    try {
        const existingUser = await User.findOne({userName});
        if(!existingUser) return res.status(404).json({message:'User does not exist'});
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid Credentials'})
        const token = jwt.sign(
            {userName:existingUser.userName,id:existingUser._id},
            //You can add a secret dynamically too 
            'test'
            )
        res.status(200).json({access_token:token});
    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }
}