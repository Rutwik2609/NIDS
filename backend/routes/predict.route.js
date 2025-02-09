import express from "express";

import { predictController } from "../controllers/predict.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/result', predictController);

export default router;