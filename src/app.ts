import express from 'express';
import  "./utils/mysql_conn";
import {router as userRouter} from "./routes/userRoute";
import {router as productRouter} from "./routes/productRoute";
import {router as productCategoryRouter } from "./routes/productCategoryRoute";
import {router as productSkillRouter } from "./routes/skillRoute";
import {router as cartRouter } from "./routes/cartRoute";
import {authenticateToken}  from './middleware/authMiddleware'
// import crypto from 'crypto'
const app = express();
const port = process.env.PORT || 5000;
//for generating secre key
// crypto.randomBytes(48, function(err, buffer) { const token = buffer.toString('hex'); console.log(token); });

app.use(express.json());

app.use('/user',userRouter);
app.use('/',authenticateToken);
app.use('/product',productRouter);
app.use('/product-category',productCategoryRouter);
app.use('/cart',cartRouter);
app.use('/product-skill',productSkillRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});