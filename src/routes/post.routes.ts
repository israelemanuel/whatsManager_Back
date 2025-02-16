
import { Router } from "express";
import ensureAuthenticated from "./../middlewares/ensureAuthenticated";

import { PostController } from "./../controllers/Post.controller";

const router = Router();

router.use(ensureAuthenticated);

const postController = new PostController();

router.post("/", postController.create);
router.get("/", postController.findAll);
router.get("/:id", postController.findOne);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

export default router;