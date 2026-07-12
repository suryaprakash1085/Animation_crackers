import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", ProductController.list);
router.get("/:id", ProductController.get);
router.post("/", requireAdmin, ProductController.create);
router.put("/:id", requireAdmin, ProductController.update);
router.delete("/:id", requireAdmin, ProductController.remove);

export default router;
