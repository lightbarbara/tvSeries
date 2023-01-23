import { QueryResult } from "pg";
import connection from "../database/db.js";
import { Series } from "../protocols/series.protocols.js";
import { UserSeries } from "../protocols/user.protocols.js";


export function watchSeriesQuery(userSeries: UserSeries): Promise<QueryResult<Series>> {
    return connection.query(`INSERT INTO "usersSeries" ("userId", "seriesId", "watchedEpisodes", rating) VALUES ($1, $2, $3, $4)`, [userSeries.userId, userSeries.seriesId, userSeries.watchedEpisodes, userSeries.rating])
}