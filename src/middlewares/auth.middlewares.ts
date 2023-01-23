import { NextFunction, Request, Response } from "express";
import { User } from "../protocols/auth.protocols.js";
import { validateAuthQuery, validateSignInQuery, validateSignUpQuery } from "../repositories/auth.repositories.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/auth.schemas.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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

export async function validateAuth(req: Request, res: Response, next: NextFunction) {

    const authorization = req.headers.authorization

    try {

        if (!authorization) {
            return res.status(401).send({ message: "Token não informado" })
        }

        const parts = authorization.split(" ")

        if (parts.length !== 2) {
            return res.status(401).send({ message: "Token inválido" })
        }

        const [scheme, token] = parts

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ message: "Token deve ser do tipo Bearer" })
        }

        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded: { id: string }) {
            if (err) {
                console.error(err)
                return res.status(401).send({ message: "Token inválido" })
            }

            const user = (await validateAuthQuery(decoded.id)).rows[0]

            if (!user) {
                return res.status(401).send({ message: "Token inválido" })
            }

            res.locals.user = user

            next()
        })

    } catch (err) {
        res.status(500).send(err.message)
    }

}