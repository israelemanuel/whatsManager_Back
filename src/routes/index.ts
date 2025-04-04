

import { Router } from 'express';

import Login from './login.routes';
import Whatsapp from './whatsappSession.routes';
import Subscrible from './subscrible.routes';

//BLOG
import Tag from './tag.routes';
import Category from './category.routes';
import Post from './post.routes';

// PAGE
import Assets from './pages/assets.routes';
import Page from './pages/Pages.routes';


//TEMPLATE
 import templete from './templete.routes';

const router = Router();

router.use('/auth', Login)

router.use('/api/v1/whatsapp', Whatsapp)

router.use('/api/v1/subscrible', Subscrible)

//BLOG
router.use('/api/v1/tag', Tag)
router.use('/api/v1/category', Category)
router.use('/api/v1/post', Post)


//TEMPLATE
router.use('/api/v1/templete', templete)

router.use(Assets,Page)


export default router;