import { Request, Response } from "express";
import { User } from "../protocols/auth.protocols.js";
import { createToken, encryptPassword } from "../services/auth.services.js";
import { signUpQuery } from "../repositories/auth.repositories.js";

export async function signUp(req: Request, res: Response): Promise<void> {

    const user = res.locals.user as User

    const encryptedPassword = encryptPassword(user.password)

    try {

        await signUpQuery(user.name, user.email, encryptedPassword)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export function signIn(req: Request, res: Response): void {

    const user = res.locals.user as User

    try {

        const token = createToken(user)

        res.status(200).send({ token })

    } catch (err) {
        res.status(500).send(err)
    }

}