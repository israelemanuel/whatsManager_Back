import express from 'express';
import http from 'http';
import Routes from './routes';

import mongodb from './configs/mongodb';
import path from 'path';

mongodb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Routes);

//STATIC ASSETS
app.use(express.static(
    path.join(__dirname, 'public')
));

const server = http.createServer(app);

export default server;