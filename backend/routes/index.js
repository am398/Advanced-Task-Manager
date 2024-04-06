import express from "express";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

const ptr = (req, res, next) => {
    console.log(req.body);
    console.log("Middleware executed");
    next();
};

router.use("/task",ptr,taskRoutes);



export default router;