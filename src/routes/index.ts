

import { Router } from 'express';

import Login from './login.routes';
import Whatsapp from './whatsappSession.routes';
import Subscrible from './subscrible.routes';

const router = Router();

router.use('/auth', Login)

router.use('/api/v1/whatsapp', Whatsapp)

router.use('/api/v1/subscrible', Subscrible)

export default router;