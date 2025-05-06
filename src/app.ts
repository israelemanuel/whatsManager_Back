import './bootstrap';
import Subscribe from './models/Subscribe';
// import WhatsappSession from './models/WhatsappSession';
import server from './server';
// import { StartAllWhatsappSession } from './services/BotServices/StartAllWhasappSession';

const port = process.env.PORT || 3000;

server.listen(port, async () => {

    console.log(`Server is running on http://localhost:${port}`);
    
    const subscribes = await Subscribe.find();
    const allPromises: any[] = [];
    
    if (subscribes.length) {
        
        // subscribes.forEach(async (subscribe) => {
        //     const promise = StartAllWhatsappSession(subscribe._id as string);
        //     allPromises.push(promise);
        // })
        
        Promise.all(allPromises).then(() => {
            console.log(`Server is running on http://localhost:${port}`);
        })
        
        // console.log(`Server is running on http://localhost:${port}`);

    }
        
});