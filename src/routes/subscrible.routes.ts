

import { Router } from 'express'

import { SubscribeController } from './../controllers/Subscribe.controller'
import ensureAuthenticated from './../middlewares/ensureAuthenticated'

const router = Router()

const subscribeController = new SubscribeController()

// router.use(ensureAuthenticated);

router.post('/', subscribeController.create);

export default router
