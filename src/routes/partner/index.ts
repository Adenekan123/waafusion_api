import express from "express";
import {router as cartRouter} from './cart'
import {router as orderRouter} from './order'
import {router as profileRouter} from './profile'
export const router = express.Router();

router.use('/cart',cartRouter);
router.use('/order',orderRouter);
router.use('/profile',profileRouter);