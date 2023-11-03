"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./utils/mysql_conn");
const userRoute_1 = require("./routes/userRoute");
const productRoute_1 = require("./routes/productRoute");
const productCategoryRoute_1 = require("./routes/productCategoryRoute");
const cartRoute_1 = require("./routes/cartRoute");
const authMiddleware_1 = require("./middleware/authMiddleware");
// import crypto from 'crypto'
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//for generating secre key
// crypto.randomBytes(48, function(err, buffer) { const token = buffer.toString('hex'); console.log(token); });
app.use(express_1.default.json());
app.use('/user', userRoute_1.router);
app.use('/', authMiddleware_1.authenticateToken);
app.use('/product', productRoute_1.router);
app.use('/product-category', productCategoryRoute_1.router);
app.use('/cart', cartRoute_1.router);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
