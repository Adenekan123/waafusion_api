"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./utils/mysql_conn");
const auth_1 = require("./routes/auth");
const admin_1 = require("./routes/admin");
const visitor_1 = require("./routes/visitor");
const partner_1 = require("./routes/partner");
const authMiddleware_1 = require("./middleware/authMiddleware");
// import crypto from 'crypto'
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
//for generating secre key
// crypto.randomBytes(48, function(err, buffer) { const token = buffer.toString('hex'); console.log(token); });
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use('/', visitor_1.router);
app.use('/auth', auth_1.router);
app.use('/admin', authMiddleware_1.authenticateToken, admin_1.router);
app.use('/partner', authMiddleware_1.authenticateToken, partner_1.router);
app.use('/image', express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
