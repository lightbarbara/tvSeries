import { Series } from "../protocols/series.protocols.js";
import { createSeriesQuery, getAllSeriesQuery, deleteSeriesQuery, updateSeriesQuery } from "../repositories/series.repositories.js";

export function updateObjectSeries(series: Series): Series {
    series.lastUpdateOnDb = Date()

    return series
}

export async function createSeriesService(series: Series): Promise<void> {

    await createSeriesQuery(series)

}

export async function getAllSeriesService(): Promise<Series[]> {

    const { rows } = await getAllSeriesQuery()

    return rows
}

export async function deleteSeriesService(series: Series): Promise<void> {

    await deleteSeriesQuery(series.id)

}

export async function updateSeriesService(series: Series, id: number): Promise<void> {

    await updateSeriesQuery(series, id)

}