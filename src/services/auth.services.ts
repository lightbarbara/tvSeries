import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../protocols/auth.protocols.js'
import dotenv from 'dotenv'

dotenv.config()

export function encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 5)
}

export function createToken(user: User): string {

    const secretKey = process.env.SECRET_KEY

    const token = jwt.sign({ id: user.id }, secretKey)

    return token

}