import connection from "../database/db.js"
import { User } from "../protocols/auth.protocols.js"

export function validateSignUpQuery(user: User) {
    return connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])
}

export function signUpQuery(name: string, email: string, password: string) {
    return connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password])
}

export function validateSignInQuery(user: User) {
    return connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])
}