import express from 'express';
import http from 'http';
import path from 'path';

import router from './router';

let app: express.Application = express();
let port: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../angular/dist/angular')));
app.use('/', router);

let server: http.Server = http.createServer(app);
server.listen(port, () => {
    console.log('Server is starting: ' + port);
});