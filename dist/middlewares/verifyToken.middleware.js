"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ status: 401, message: 'Error You are not authorized' });
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    req.body.userId = payload._id;
    return next();
};
exports.tokenValidation = tokenValidation;
