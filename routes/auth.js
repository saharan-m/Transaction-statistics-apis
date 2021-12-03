import express from 'express'
import { login } from '../controllers/auth.js';
const Router = express.Router();

Router.post('/',login)


export default Router;