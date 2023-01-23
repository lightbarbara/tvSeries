import { Router } from "express";
import { deleteSeriesUser, getYourSeries, updateSeriesUser, watchSeries } from "../controllers/user.controllers.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { validateSeriesId } from "../middlewares/series.middlewares.js";
import { validateUserDoesntHaveSeries, validateUserHasSeries, validateUserSeries } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/your-series/:id', validateAuth, validateSeriesId, validateUserSeries, validateUserDoesntHaveSeries, watchSeries)
router.get('/your-series', validateAuth, getYourSeries)
router.delete('/your-series/:id', validateAuth, validateSeriesId, validateUserHasSeries, deleteSeriesUser)
router.put('/your-series/:id', validateAuth, validateSeriesId, validateUserHasSeries, validateUserSeries, updateSeriesUser)

export default router