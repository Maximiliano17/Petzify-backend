import Express, { Router } from "express";
import { signup, signin, profile } from '../controller/auth.controller';
import { tokenValidation } from '../middlewares/verifyToken.middleware';
import { schemaValidation } from '../middlewares/validator.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
const router: Router = Express.Router();

router
    .post('/signin', schemaValidation(loginSchema), signin)
    .post('/signup', schemaValidation(registerSchema), signup)
    .get('/profile', tokenValidation, profile)

export default router; 