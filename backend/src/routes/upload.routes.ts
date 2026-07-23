import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import {
  previewCSV,
  importCSV,
} from "../controllers/upload.controller";

const router = Router();

router.post("/preview", upload.single("file"), previewCSV);

router.post("/import", upload.single("file"), importCSV);

export default router;