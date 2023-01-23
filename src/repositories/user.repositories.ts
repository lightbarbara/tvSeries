import { Query, QueryResult } from "pg";
import connection from "../database/db.js";
import { User } from "../protocols/auth.protocols.js";
import { Series } from "../protocols/series.protocols.js";
import { UserSeries, YourSeries } from "../protocols/user.protocols.js";


export function watchSeriesQuery(userSeries: UserSeries): Promise<QueryResult<UserSeries[]>> {
    return connection.query(`INSERT INTO "usersSeries" ("userId", "seriesId", "watchedEpisodes", rating) VALUES ($1, $2, $3, $4)`, [userSeries.userId, userSeries.seriesId, userSeries.watchedEpisodes, userSeries.rating])
}

export function validateUserHasSeriesQuery(user: User, series: Series): Promise<QueryResult<UserSeries[]>> {
    return connection.query(`SELECT * FROM "usersSeries" WHERE "userId"=$1 AND "seriesId"=$2`, [user.id, series.id])
}

export function deleteSeriesUserQuery(user: User, series: Series): Promise<QueryResult<UserSeries>> {
    return connection.query(`DELETE FROM "usersSeries" WHERE "userId"=$1 AND "seriesId"=$2`, [user.id, series.id])
}

export function getYourSeriesQuery(user: User): Promise<QueryResult<YourSeries>> {
    return connection.query(`SELECT series.name, series.platform, series.category, series."numberOfEpisodes", series.finished, series."lastUpdateOnDb" AS "lastUpdateOnSeries", "usersSeries"."watchedEpisodes", "usersSeries".rating FROM "usersSeries" LEFT JOIN series ON "usersSeries"."seriesId" = series.id WHERE "usersSeries"."userId"=$1`, [user.id])
}

export function updateSeriesUserQuery(updateObject: UserSeries): Promise<QueryResult<UserSeries>> {
    return connection.query(`UPDATE "usersSeries" SET "watchedEpisodes"=$1, rating=$2 WHERE "userId"=$3 AND "seriesId"=$4`, [updateObject.watchedEpisodes, updateObject.rating, updateObject.userId, updateObject.seriesId])
}