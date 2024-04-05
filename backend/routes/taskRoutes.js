import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/dashboard", dashboardStatistics);
router.get("/", getTasks);
router.get("/:id", getTask);

router.patch("/create-subtask/:id", createSubTask);
router.patch("/update/:id", updateTask);

router.delete(
  "/delete/:id",
  deleteTask
);

export default router;