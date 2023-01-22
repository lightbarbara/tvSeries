import { Router } from "express";
import authRoutes from './auth.routes.js'
import seriesRoutes from './series.routes.js'

const router = Router()

router.use(authRoutes)
router.use(seriesRoutes)

export default router