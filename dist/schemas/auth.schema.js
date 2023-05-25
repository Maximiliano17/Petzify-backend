"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const VALUES = ["user", "business", "institution", "admin"];
exports.loginSchema = zod_1.default.object({
    body: zod_1.default.object({
        username: zod_1.default.string()
            .nonempty('El nombre de usuario es requerido.')
            .min(6, "Se necesita un minimo de 6 caracteres para el nombre de usuario."),
        password: zod_1.default.string()
            .nonempty('La contraseña es requerida.')
            .min(6, "Se necesita un minimo de 6 caracteres para su contraseña.")
    }),
});
exports.registerSchema = zod_1.default.object({
    body: zod_1.default.object({
        username: zod_1.default.string().nonempty('El nombre de usuario es requerido.').min(6, "Se necesita un minimo de 6 caracteres para el nombre de usuario."),
        password: zod_1.default.string().nonempty('La contraseña es requerida.').min(6, "Se necesita un minimo de 6 caracteres para su contraseña."),
        email: zod_1.default.string().nonempty('El email es requerido.').email(),
        role: zod_1.default.enum(VALUES)
    }),
});
