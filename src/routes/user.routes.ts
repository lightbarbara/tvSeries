import { Router } from "express";
import { watchSeries } from "../controllers/user.controllers.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { validateSeriesId } from "../middlewares/series.middlewares.js";
import { validateUserSeries } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/watch/:id', validateAuth, validateSeriesId, validateUserSeries, watchSeries)

export default router