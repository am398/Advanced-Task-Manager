import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/dashboard", dashboardStatistics);
router.get("/", getTasks);

router.patch("/add-subtask/:id", createSubTask);
router.patch("/update/:id", updateTask);

router.delete("/delete/:id",deleteTask);

export default router;