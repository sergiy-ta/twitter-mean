
import express from 'express';
import path from 'path';

import user_router from './router/user.router';
import twitte_router from './router/twitte.router';
import login_router from './router/login.router';

const router: express.Router = express.Router();

router.use('/api', user_router);
router.use('/api', twitte_router);
router.use('/api', login_router);

router.get('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../../angular/dist/angular/index.html'));
});

export default router;