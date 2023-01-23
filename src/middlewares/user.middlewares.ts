import { Request, Response, NextFunction } from "express"
import { User } from "../protocols/auth.protocols.js"
import { Series } from "../protocols/series.protocols.js"
import { UserSeries } from "../protocols/user.protocols.js"
import { validateUserHasSeriesQuery } from "../repositories/user.repositories.js"
import { userSeriesSchema } from "../schemas/user.schemas.js"

export function validateUserSeries(req: Request, res: Response, next: NextFunction): void {

    const user = res.locals.user as User
    const series = res.locals.series as Series
    const watchedEpisodes: number = req.body.watchedEpisodes
    const rating: string = req.body.rating

    const userSeries: UserSeries = {
        userId: user.id,
        seriesId: series.id,
        watchedEpisodes: watchedEpisodes,
        rating: rating
    }

    const validation = userSeriesSchema.validate(userSeries, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        res.locals.userSeries = userSeries

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateUserDoesntHaveSeries(req: Request, res: Response, next: NextFunction): Promise<void> {

    const user = res.locals.user as User
    const series = res.locals.series as Series

    try {

        const userDoesntHaveSeries = await validateUserHasSeriesQuery(user, series)

        if (userDoesntHaveSeries.rows.length > 0) {
            res.sendStatus(409)
            return
        }

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateUserHasSeries(req: Request, res: Response, next: NextFunction): Promise<void> {

    const user = res.locals.user as User
    const series = res.locals.series as Series

    try {

        const userHasSeries = await validateUserHasSeriesQuery(user, series)

        if (userHasSeries.rows.length > 0) {
            next()
        }

    } catch (err) {
        res.status(500).send(err.message)
    }

}