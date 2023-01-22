import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controllers.js";

const router = Router()

router.post('/sign-up', signUp)
router.post('/', signIn)