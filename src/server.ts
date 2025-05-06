import express from 'express';
import http from 'http';
import Routes from './routes';

import mongodb from './configs/mongodb';
import path from 'path';
// import { OpenWebUi } from './libs/openwebui';

//OPEN WEB UI
(async () => {
    // const openWebUi = new OpenWebUi();

    // const msn = await openWebUi.chat({
    //     model: 'splitpierre/bode-alpaca-pt-br:latest',
    //     messages: [
    //         {
    //             role: 'user',
    //             content: 'as resportas de ser curtas e objetivas'
    //         },
    //         {
    //             role: 'user',
    //             content: 'linguagem de programação é apenas em JS'
    //         },
    //         {
    //             role: 'user',
    //             content: 'me ajuda como fazer um FOR'
    //         }
    //     ]
    // })

    // console.log(msn.choices[0].message);
    
})()

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