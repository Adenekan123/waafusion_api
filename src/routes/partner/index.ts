import express from "express";
import {router as cartRouter} from './cart'
export const router = express.Router();

router.use('/cart',cartRouter)