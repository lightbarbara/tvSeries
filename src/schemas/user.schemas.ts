import joi from 'joi'

export const userSeriesSchema = joi.object({
    userId: joi.number().required(),
    seriesId: joi.number().required(),
    watchedEpisodes: joi.number().required(),
    rating: joi.string().required()
})