
import http from 'node:http';

type TModel = 'deepseek-coder:latest' | 'splitpierre/bode-alpaca-pt-br:latest' | '';

interface IOpenWebUi {
    model: TModel;
}

export interface IMessage {
    role: string;
    content: string;
}

export interface IChat {
    model: TModel;
    messages: IMessage[];
}


export class OpenWebUi {


    #token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MDVlODYwLWNjY2UtNDU5Mi04MzllLWViMmYyMDNhNDFiNSJ9.n5Mo0FN-cksM3-NQ31I_Wuf7zDz_Dt-eh4Ixsr5oGIQ';
    #model: TModel = '';
    #host = 'http://192.168.0.3:3050';

    constructor() {};


    //metodo pra CONVERSA COM A IA
    async chat(data: IChat)  : Promise<any> {
        const url = `${this.#host}/api/chat/completions`;
        return await this.post(url, data);
    }

    //REQUEST METHODS
    async get(url: string) {

        return new Promise((resolve, reject) => {
            const get = http.get(url, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            }).on('error', (err) => {
                reject(err);
            });

            get.end();
        });


    }

    async post(url: string, data: any) {
        return new Promise((resolve, reject) => {
            const req = http.request(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + this.#token
                }
            }, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(responseData));
                });
            });

            req.on('error', (err) => {
                reject(err);
            });

            req.write(JSON.stringify(data));
            req.end();
        });
    }
}