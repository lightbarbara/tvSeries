import { QueryResult } from "pg"
import connection from "../database/db.js"
import { Series } from "../protocols/series.protocols.js"

export function validateSeriesQuery(series: Series): Promise<QueryResult<Series>> {
    return connection.query(`SELECT * FROM series WHERE name=$1`, [series.name])
}

export function createSeriesQuery(series: Series): Promise<QueryResult<Series>> {
    return connection.query(`INSERT INTO series (name, platform, category, "numberOfEpisodes", "numberOfSeasons", finished, "lastUpdateOnDb") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [series.name, series.platform, series.category, series.numberOfEpisodes, series.numberOfSeasons, series.finished, series.lastUpdateOnDb])
}

export function getAllSeriesQuery(): Promise<QueryResult<Series>> {
    return connection.query(`SELECT * FROM series`)
}

export function getSeriesServiceByCategoryQuery(category: string): Promise<QueryResult<Series>> {
    return connection.query(`SELECT * FROM series WHERE category LIKE $1`, [`${category}%`])
}

export function validateSeriesIdQuery(id: number): Promise<QueryResult<Series>> {
    return connection.query(`SELECT * FROM series WHERE id=$1`, [id])
}

export function deleteSeriesQuery(id: number): Promise<QueryResult<Series>> {
    return connection.query(`DELETE FROM series WHERE id=$1`, [id])
}

export function updateSeriesQuery(series: Series, id: number): Promise<QueryResult<Series>> {
    return connection.query(`UPDATE series SET name=$1, platform=$2, category=$3, "numberOfEpisodes"=$4, "numberOfSeasons"=$5, finished=$6, "lastUpdateOnDb"=$7 WHERE id=$8`, [series.name, series.platform, series.category, series.numberOfEpisodes, series.numberOfSeasons, series.finished, series.lastUpdateOnDb, id])
}