import express from 'express'
import { getStatus } from '../controllers/stats.js';
import auth from '../middleware/auth.js'
const Router =  express.Router();

Router.get('/',auth,getStatus);

export default Router