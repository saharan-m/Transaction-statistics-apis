import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ['CREDIT','DEBIT'],   
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        enum: ['INR','USD','EURO'],
        required:true,
    },
    status:{
        type:String,
        enum: ['INPROGRESS','COMPLETED'],
    },
    timestamp:{
        type:Number,
        required:true
    }
})

const Transaction = mongoose.model('Transaction',transactionSchema);

export default Transaction;