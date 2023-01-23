import { UserSeries } from "../protocols/user.protocols.js";
import { watchSeriesQuery } from "../repositories/user.repositories.js";

export async function watchSeriesService(userSeries: UserSeries) {

    await watchSeriesQuery(userSeries)

}