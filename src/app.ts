import path from 'path'
import express from 'express';
import cors from "cors"
import  "./utils/mysql_conn";
import {router as adminRouter} from "./routes/admin";
import {router as freeRouter} from "./routes/free";
import {router as partnerRouter } from "./routes/partner";

import { authenticateToken } from './middleware/authMiddleware';
// import crypto from 'crypto'
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin:'http://localhost:3000'}))
//for generating secre key
// crypto.randomBytes(48, function(err, buffer) { const token = buffer.toString('hex'); console.log(token); });
app.use(express.urlencoded());
app.use(express.json());
app.use('/',freeRouter);
app.use('/admin',authenticateToken,adminRouter);
app.use('/partner',authenticateToken,partnerRouter);
app.use('/image', express.static(path.join(__dirname,'../dist')));



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});