import { Request, Response } from "express";
import { Series } from "../protocols/series.protocols.js";
import { createSeriesService, deleteSeriesService, getAllSeriesService, updateSeriesService } from "../services/series.services.js";

export function createSeries(req: Request, res: Response) {

    const series = res.locals.series as Series

    try {

        createSeriesService(series)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllSeries(req: Request, res: Response) {

    try {

        const series = await getAllSeriesService()

        res.send(series)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export function getSeriesById(req: Request, res: Response) {

    const series = res.locals.series as Series

    res.status(200).send(series)

}

export function deleteSeries(req: Request, res: Response) {

    const series = res.locals.series as Series

    try {

        deleteSeriesService(series)

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function updateSeries(req: Request, res: Response) {

    const series = res.locals.series as Series

    const id = req.params.id

    try {

        await updateSeriesService(series, Number(id))

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }


}