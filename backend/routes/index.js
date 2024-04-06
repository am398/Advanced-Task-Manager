import express from "express";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();


router.use("/task",taskRoutes);



export default router;