"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRETE_KEY = process.env.SECRET_KEY || "";
const interceptor = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, SECRETE_KEY, (err, user) => {
            if (!err) {
                req.user = user;
            }
            next();
        });
    }
    else {
        next();
    }
};
exports.interceptor = interceptor;
