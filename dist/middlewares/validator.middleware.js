"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const zod_1 = require("zod");
const schemaValidation = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
        }
        return res.status(400).json({ message: 'internal server error' });
    }
};
exports.schemaValidation = schemaValidation;
