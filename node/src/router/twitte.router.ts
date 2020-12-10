
import express from 'express';

import Twitte from '../interface/object/Twitte';

import TwitteModel from '../model/twitte.model';

const jsonParser = express.json();

const router: express.Router = express.Router();

router.get('/twitte', async (req: express.Request, res: express.Response) => {
    let twitteModel: TwitteModel = new TwitteModel();
    let twitte_list: Twitte[] = await twitteModel.getList();

    res.send({
        twitte_list: twitte_list
    });
});

router.get('/twitte/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let twitteModel: TwitteModel = new TwitteModel();
    let twitte: Twitte | null = await twitteModel.get(id);

    res.send({
        teitte: twitte
    });
});

router.post('/twitte', jsonParser, async (req: express.Request, res: express.Response) => {
    let user_id: string = req.body.user_id;
    let text: string = req.body.text;

    let twitteModel: TwitteModel = new TwitteModel();
    let twitte: Twitte | null = await twitteModel.create(user_id, text);

    res.send({
        is_create: !!twitte
    });
});

router.put('/twitte', jsonParser, async (req: express.Request, res: express.Response) => {
    let id: string = req.body.id;
    let text: string = req.body.text;

    let twitteModel: TwitteModel = new TwitteModel();
    let is_update: boolean = await twitteModel.update(id, text);

    res.send({
        is_update: is_update
    });
});

router.delete('/twitte/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let twitteModel: TwitteModel = new TwitteModel();
    let is_delete: boolean = await twitteModel.delete(id);

    res.send({
        is_delete: is_delete
    });
});


export default router;