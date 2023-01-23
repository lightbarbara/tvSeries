import { Router } from "express";
import { createSeries, deleteSeries, getAllSeries, getSeriesById, updateSeries } from "../controllers/series.controllers.js";
import { validateSeries, validateSeriesId } from "../middlewares/series.middlewares.js";

const router = Router()

router.post('/series', validateSeries, createSeries)
router.get('/series', getAllSeries)
router.get('/series/:id', validateSeriesId, getSeriesById)
router.delete('/series/:id', validateSeriesId, deleteSeries)
router.put('/series/:id', validateSeriesId, validateSeries, updateSeries)

export default router