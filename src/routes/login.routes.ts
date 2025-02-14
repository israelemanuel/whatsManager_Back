

import { Router } from 'express'

import { LoginController } from './../controllers/Login.controller'
import ensureAuthenticated from './../middlewares/ensureAuthenticated'

const router = Router()

const loginController = new LoginController()

// router.use(ensureAuthenticated);

router.post('/login', loginController.login)
router.post('/register', loginController.register)

export default router
