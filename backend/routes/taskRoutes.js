import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
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
router.put("/update/:id", updateTask);

router.delete(
  "/delete-restore/:id?",
  deleteRestoreTask
);

export default router;