import { Router } from 'express'

import ensureAuthenticated from './../middlewares/ensureAuthenticated'

import { CategoryController } from './../controllers/Category.controller'

const router = Router();

router.use(ensureAuthenticated)

const categoryController = new CategoryController()

router.post('/', ensureAuthenticated, categoryController.create)
router.get('/', ensureAuthenticated, categoryController.findAll)
router.get('/:id', ensureAuthenticated, categoryController.findOne)
router.put('/:id', ensureAuthenticated, categoryController.update)
router.delete('/:id', ensureAuthenticated, categoryController.delete)

export default router