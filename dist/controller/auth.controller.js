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
exports.profile = exports.signup = exports.signin = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userFind = yield auth_model_1.default.findOne({ username: username });
        if (!userFind)
            return res.status(400).json({ status: 400, message: 'User Not Found.' });
        const authPassword = yield userFind.validatePassword(password);
        if (!authPassword)
            return res.status(400).json({ status: 400, message: 'Error Password Incorrect' });
        const token = jsonwebtoken_1.default.sign({ _id: userFind._id }, process.env.TOKEN_SECRET || 'tokentest');
        return res.header('auth-token', token).status(200).json({ status: 200, user: userFind });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        const newUser = yield auth_model_1.default.create({
            username,
            email,
            password,
            role
        });
        newUser.password = yield newUser.encryptPassword(newUser.password);
        const savedUser = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id, role }, process.env.TOKEN_SECRET || 'tokentest');
        return res.header('auth-token', token).status(200).json({ status: 200, user: savedUser });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
});
exports.signup = signup;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserFind = yield auth_model_1.default.findById(req.body.userId);
        if (!UserFind)
            return res.status(400).json({ status: 400, message: 'User Not Found' });
        return res.status(200).json({ status: 200, user: UserFind });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.profile = profile;
