import { Router } from "express";
import ensureAuthenticated from "./../../middlewares/ensureAuthenticated";
import AssetsController from "../../controllers/pages/assets.controller";


const router = Router();

// router.use(ensureAuthenticated);

const assetsController = new AssetsController();

router.get("/style.css", assetsController.css);
router.get("/script.js", assetsController.js);
router.get("/styles/:filecss", assetsController.folderCss);
router.get("/scripts/:filejs", assetsController.folderJs);
router.get("/images/:fileImage", assetsController.folderImages);




export default router;