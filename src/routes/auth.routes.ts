import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { validateSignIn, validateSignUp } from "../middlewares/auth.middlewares.js";

const router = Router()

router.post('/sign-up', validateSignUp, signUp)
router.post('/', validateSignIn, signIn)

export default router