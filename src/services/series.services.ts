import { Series } from "../protocols/series.protocols.js";
import { createSeriesQuery, getAllSeriesQuery, deleteSeriesQuery, updateSeriesQuery } from "../repositories/series.repositories.js";

export function updateObjectSeries(series: Series) {
    series.lastUpdateOnDb = Date()

    return series
}

export async function createSeriesService(series: Series) {

    await createSeriesQuery(series)

}

export async function getAllSeriesService() {

    const { rows } = await getAllSeriesQuery()

    return rows
}

export async function deleteSeriesService(series: Series) {

    await deleteSeriesQuery(series.id)

}

export async function updateSeriesService(series: Series, id: number) {

    await updateSeriesQuery(series, id)

}