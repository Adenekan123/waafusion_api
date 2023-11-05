import express from "express";
import { upload } from "../utils/multer_upload";
import {Productroller} from "../controllers/productController";
import {createProductValidator,deleteProductValidator,updateProductValidator} from "../validators/productValidator"

export const router = express.Router();

router.post('/create',upload.array('image'),createProductValidator,Productroller.createProduct);
router.delete('/delete',deleteProductValidator,Productroller.deleteProduct);
router.patch('/update',upload.array('image'),updateProductValidator,Productroller.updateProduct);
router.get('/all',Productroller.fetchProducts);
router.post('/filter',Productroller.filterProducts);

