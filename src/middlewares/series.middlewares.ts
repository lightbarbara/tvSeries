import { NextFunction, Request, Response } from "express";
import { Series } from "../protocols/series.protocols.js";
import { validateSeriesIdQuery, validateSeriesQuery } from "../repositories/series.repositories.js";
import { seriesSchema } from "../schemas/series.schemas.js";
import { updateObjectSeries } from "../services/series.services.js";

export async function validateSeries(req: Request, res: Response, next: NextFunction): Promise<void> {

    let series = req.body as Series

    const id = req.params.id

    series = updateObjectSeries(series)

    const validation = seriesSchema.validate(series, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        const seriesExists = await validateSeriesQuery(series)

        if (seriesExists.rows.length > 0) {
            if (id && seriesExists.rows[0].id !== Number(id)) {
                res.sendStatus(409)
                return
            } else if (!id) {
                res.sendStatus(409)
                return
            }
        }

        res.locals.series = series

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateSeriesId(req: Request, res: Response, next: NextFunction): Promise<void> {

    const id = req.params.id

    try {

        const seriesExists = await validateSeriesIdQuery(Number(id))

        if (seriesExists.rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.locals.series = seriesExists.rows[0]

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}