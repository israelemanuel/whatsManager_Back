
import { Router } from 'express';
import ensureAuthenticated from './../middlewares/ensureAuthenticated';
import TemplateController from './../controllers/Template.controller';

const router = Router();

router.use(ensureAuthenticated);

const templateController = new TemplateController();

router.get('/', templateController.readDir);
router.get('/:filename', templateController.read);
router.put('/:filename', templateController.update);


export default router;
