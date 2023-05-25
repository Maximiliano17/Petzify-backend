import Express, { Router } from "express";

const router: Router = Express.Router();

router.get('/', (_req, res) => {
    res.send("hola");
})

export default router;