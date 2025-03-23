
import { Router } from "express";
import ensureAuthenticated from "./../../../middlewares/ensureAuthenticated";
import { PageController } from "../../../controllers/pages/connectfy/index.controller";


const router = Router();

// router.use(ensureAuthenticated);

const pageController = new PageController();

router.get("/", pageController.index);

export default router;