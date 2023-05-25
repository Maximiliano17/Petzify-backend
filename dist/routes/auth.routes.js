"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const router = express_1.default.Router();
router
    .post('/signin', (0, validator_middleware_1.schemaValidation)(auth_schema_1.loginSchema), auth_controller_1.signin)
    .post('/signup', (0, validator_middleware_1.schemaValidation)(auth_schema_1.registerSchema), auth_controller_1.signup)
    .get('/profile', verifyToken_middleware_1.tokenValidation, auth_controller_1.profile);
exports.default = router;
