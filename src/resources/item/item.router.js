import { Router } from "express";

const router = Router();

// /api/item
router.route("/").get(controller).post();

// /api/item/:id
router.route("/:id").put(controller).delete(controller).get(controller);

export default router;
