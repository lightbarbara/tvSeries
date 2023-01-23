import { Request, Response } from "express";
import { User } from "../protocols/auth.protocols.js";
import { Series } from "../protocols/series.protocols.js";
import { UserSeries } from "../protocols/user.protocols.js";
import { deleteSeriesUserService, getYourSeriesService, updateSeriesUserService, watchSeriesService } from "../services/user.services.js";

export function watchSeries(req: Request, res: Response): void {

    const userSeries = res.locals.userSeries as UserSeries

    try {

        watchSeriesService(userSeries)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export function deleteSeriesUser(req: Request, res: Response): void {

    const series = res.locals.series as Series
    const user = res.locals.user as User

    try {

        deleteSeriesUserService(user, series)

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getYourSeries(req: Request, res: Response): Promise<void> {

    const user = res.locals.user as User

    try {

        const yourSeries = await getYourSeriesService(user)

        res.status(200).send(yourSeries)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export function updateSeriesUser(req: Request, res: Response) {

    const series = res.locals.series as Series
    const user = res.locals.user as User

    const watchedEpisodes: number = req.body.watchedEpisodes
    const rating: string = req.body.rating

    const updateObject: UserSeries = {
        userId: user.id,
        seriesId: series.id,
        watchedEpisodes: watchedEpisodes,
        rating: rating
    }

    try {

        updateSeriesUserService(updateObject)

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}