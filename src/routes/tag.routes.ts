
import { Router } from 'express'

import ensureAuthenticated from './../middlewares/ensureAuthenticated'

import { TagController } from './../controllers/Tag.controller'

const router = Router();
router.use(ensureAuthenticated)

const tagController = new TagController()

router.post('/', ensureAuthenticated, tagController.create)
router.get('/', ensureAuthenticated, tagController.findAll)
router.get('/:id', ensureAuthenticated, tagController.findOne)
router.put('/:id', ensureAuthenticated, tagController.update)
router.delete('/:id', ensureAuthenticated, tagController.delete)

export default router