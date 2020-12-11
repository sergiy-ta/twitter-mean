
import express from 'express';

import Tweet from '../interface/object/Tweet';

import TweetModel from '../model/tweet.model';

const jsonParser = express.json();

const router: express.Router = express.Router();

// It's router for get list all tweet
router.get('/tweet', async (req: express.Request, res: express.Response) => {
    let tweetModel: TweetModel = new TweetModel();
    let tweet_list: Tweet[] = await tweetModel.getList();

    res.send({
        tweet_list: tweet_list
    });
});

// It's router for get tweet by id
router.get('/tweet/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let tweetModel: TweetModel = new TweetModel();
    let tweet: Tweet | null = await tweetModel.get(id);

    res.send({
        teitte: tweet
    });
});

// It's router for create tweet
router.post('/tweet', jsonParser, async (req: express.Request, res: express.Response) => {
    let user_id: string = req.body.user_id;
    let text: string = req.body.text;

    let tweetModel: TweetModel = new TweetModel();
    let tweet: Tweet | null = await tweetModel.create(user_id, text);

    res.send({
        is_create: !!tweet
    });
});

// It's router for upate tweet by id
router.put('/tweet', jsonParser, async (req: express.Request, res: express.Response) => {
    let id: string = req.body.id;
    let text: string = req.body.text;

    let tweetModel: TweetModel = new TweetModel();
    let is_update: boolean = await tweetModel.update(id, text);

    res.send({
        is_update: is_update
    });
});

// It's router for delete tweet by id
router.delete('/tweet/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let tweetModel: TweetModel = new TweetModel();
    let is_delete: boolean = await tweetModel.delete(id);

    res.send({
        is_delete: is_delete
    });
});


export default router;