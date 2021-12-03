import express from 'express'
import { createTransaction,updateTransaction } from '../controllers/transactions.js';
import auth from '../middleware/auth.js'
const Router = express.Router();


Router.post('/',auth,createTransaction)
Router.patch('/',auth,updateTransaction)
export default Router;