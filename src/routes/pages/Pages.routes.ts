import { Router } from "express";
import ensureAuthenticated from "./../../middlewares/ensureAuthenticated";
import { PageController } from "../../controllers/pages/index.controller";


const router = Router();

// router.use(ensureAuthenticated);

const pageController = new PageController();

router.get("/", pageController.page);
router.get("/:page", pageController.page);
//router.get("/:folder/:page", pageController.assets);

// Middleware para rotas inexistentes
// router.use((req, res) => {
//     pageController.notFound(req, res);
// });

export default router;