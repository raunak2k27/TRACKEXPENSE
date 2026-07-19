import express from "express";
import { submitSupportMessage, getSupportMessages } from "../controllers/supportController.js";

const router = express.Router();

router.post("/contact", submitSupportMessage);
router.get("/", getSupportMessages); // TODO: protect this with auth middleware so only you can view it

export default router;