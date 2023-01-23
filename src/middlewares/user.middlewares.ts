import { Request, Response, NextFunction } from "express"
import { User } from "../protocols/auth.protocols.js"
import { Series } from "../protocols/series.protocols.js"
import { UserSeries } from "../protocols/user.protocols.js"
import { userSeriesSchema } from "../schemas/user.schemas.js"

export async function validateUserSeries(req: Request, res: Response, next: NextFunction) {

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