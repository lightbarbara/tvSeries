export type UserSeries = {
    id?: number,
    userId: number,
    seriesId: number,
    watchedEpisodes: number,
    rating: string
}

export type YourSeries = {
    name: string,
    platform: string,
    category: string,
    numberOfEpisodes: number,
    finished: boolean,
    lastUpdateOnSeries: string,
    watchedEpisodes: number,
    rating: string
}