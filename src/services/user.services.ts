import { User } from "../protocols/auth.protocols.js";
import { Series } from "../protocols/series.protocols.js";
import { UserSeries, YourSeries } from "../protocols/user.protocols.js";
import { deleteSeriesUserQuery, getYourSeriesQuery, updateSeriesUserQuery, watchSeriesQuery } from "../repositories/user.repositories.js";

export async function watchSeriesService(userSeries: UserSeries): Promise<void> {

    await watchSeriesQuery(userSeries)

}

export async function deleteSeriesUserService(user: User, series: Series): Promise<void> {

    await deleteSeriesUserQuery(user, series)

}

export async function getYourSeriesService(user: User): Promise<YourSeries[]> {

    const { rows } = await getYourSeriesQuery(user)

    return rows

}

export async function updateSeriesUserService(updateObject: UserSeries): Promise<void> {

    await updateSeriesUserQuery(updateObject)

}