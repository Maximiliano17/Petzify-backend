"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = process.env.DB_USERNAME1;
const password = process.env.DB_PASSWORD;
const URI = `mongodb+srv://${username}:${password}@cluster0.ktoxf8e.mongodb.net/pet-tracker?retryWrites=true&w=majority`;
// Localhost: mongodb://0.0.0.0:27017/pet-tracker
mongoose_1.default
    .connect(URI)
    .then(_db => console.log('Database is connected'))
    .catch(err => console.log(err));
