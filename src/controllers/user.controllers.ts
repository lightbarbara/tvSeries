import { Request, Response } from "express";
import { UserSeries } from "../protocols/user.protocols.js";
import { watchSeriesService } from "../services/user.services.js";

export async function watchSeries(req: Request, res: Response):Promise<void> {

    const userSeries = res.locals.userSeries as UserSeries

    try {

        watchSeriesService(userSeries)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}