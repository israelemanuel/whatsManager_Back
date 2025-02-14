

import { Router } from 'express'

import { WhatsappController } from './../controllers/WhatsappSession.controller'
import ensureAuthenticated from './../middlewares/ensureAuthenticated'

const router = Router()

const loginController = new WhatsappController()

router.use(ensureAuthenticated);

router.post('/autehnticate', loginController.autehnticate)
router.post('/respond', loginController.respond)

router.post('/', loginController.create)

router.post('/start/:id', loginController.start)


export default router
