import { NextFunction, Request, Response } from "express";
import { User } from "../protocols/auth.protocols.js";
import { validateSignInQuery, validateSignUpQuery } from "../repositories/auth.repositories.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/auth.schemas.js";
import bcrypt from 'bcrypt'

export async function validateSignUp(req: Request, res: Response, next: NextFunction) {

    const user = req.body as User

    const validation = userSignUpSchema.validate(user, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        const emailExists = await validateSignUpQuery(user)

        if (emailExists.rows.length > 0) {
            res.sendStatus(409)
            return
        }

        res.locals.user = user

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateSignIn(req: Request, res: Response, next: NextFunction) {

    const user = req.body as User

    const validation = userSignInSchema.validate(user, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        const userExists = await validateSignInQuery(user)

        if (userExists.rows.length === 0) {
            res.status(401).send({ message: 'Dados incorretos' })
            return
        }

        const validatePassword = bcrypt.compareSync(user.password, userExists.rows[0].password)

        if (!validatePassword) {
            res.status(401).send({ message: 'Dados incorretos' })
            return
        }

        res.locals.user = userExists.rows[0]

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}