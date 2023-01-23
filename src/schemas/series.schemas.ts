import joi from 'joi'

export const seriesSchema = joi.object({
    name: joi.string().required(),
    platform: joi.string().required(),
    category: joi.string().required(),
    numberOfEpisodes: joi.number().required(),
    numberOfSeasons: joi.number().required(),
    finished: joi.boolean().required(),
    lastUpdateOnDb: joi.string().required()
})