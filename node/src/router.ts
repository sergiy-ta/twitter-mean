
import express from 'express';
import path from 'path';

import user_router from './router/user.router';
import tweet_router from './router/tweet.router';
import login_router from './router/login.router';

const router: express.Router = express.Router();

router.use('/api', user_router);
router.use('/api', tweet_router);
router.use('/api', login_router);

// It's router for connect to angular
router.get('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../../angular/dist/angular/index.html'));
});

export default router;