"use strict";
// Modules
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
// Settings
app.set('PORT', process.env.PORT || 4000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/post', post_routes_1.default);
exports.default = app;
