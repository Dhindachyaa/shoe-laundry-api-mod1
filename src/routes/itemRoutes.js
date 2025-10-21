import express from "express";
import { ItemController } from "../controllers/itemController.js";

const router = express.Router();

// Define CRUD Endpoints
router.get("/", ItemController.getAll); // GET /api/items dan GET /api/items?status=Selesai
router.get("/:id", ItemController.getById);
router.post("/", ItemController.create);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.remove);

export default router;