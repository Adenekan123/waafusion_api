"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const token_1 = require("../models/token");
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { firstname, lastname, state, email, phone, address, password, role, } = req.body;
            try {
                const existingUser = yield user_1.User.getUserByEmail(email);
                if (existingUser)
                    return res.status(400).json({ error: "User already exists" });
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const userId = role
                    ? yield user_1.User.create({
                        firstname,
                        lastname,
                        state,
                        email,
                        phone,
                        address,
                        password: hashedPassword,
                        role,
                    })
                    : yield user_1.User.create({
                        firstname,
                        lastname,
                        state,
                        email,
                        phone,
                        address,
                        password: hashedPassword,
                    });
                res.status(201).json({ message: "User registered succesfully", userId });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            try {
                const user = yield user_1.User.getUserByEmail(email);
                if (!user)
                    return res.status(401).json({ error: "Invalid credentials" });
                //check if password matches
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid)
                    return res.status(401).json({ error: "Invalid credentials" });
                //Generate access token
                const accesToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY || "", { expiresIn: "2days" });
                const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "7d" });
                return res.status(200).json({ accesToken, refreshToken });
            }
            catch (err) {
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static logout(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract the token from the request, assuming it's stored in a cookie or header
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const tokenBlacklisted = yield token_1.TokenBlacklist.tokenBlacklisted(token);
                if (tokenBlacklisted)
                    return res
                        .status(401)
                        .json({ error: "Unauthorized, You are logged out" });
                yield token_1.TokenBlacklist.create({ token });
                delete req.user;
                return res.status(401).json({ error: "You are logged out" });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.UserController = UserController;
