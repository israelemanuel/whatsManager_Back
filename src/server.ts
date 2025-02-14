import express from 'express';
import http from 'http';
import Routes from './routes';

import mongodb from './configs/mongodb';

mongodb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Routes);

const server = http.createServer(app);

export default server;