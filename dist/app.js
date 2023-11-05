"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./utils/mysql_conn");
const admin_1 = require("./routes/admin");
const free_1 = require("./routes/free");
const partner_1 = require("./routes/partner");
const authMiddleware_1 = require("./middleware/authMiddleware");
// import crypto from 'crypto'
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//for generating secre key
// crypto.randomBytes(48, function(err, buffer) { const token = buffer.toString('hex'); console.log(token); });
app.use(express_1.default.json());
app.use('/', free_1.router);
app.use('/admin', authMiddleware_1.authenticateToken, admin_1.router);
app.use('/partner', authMiddleware_1.authenticateToken, partner_1.router);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
