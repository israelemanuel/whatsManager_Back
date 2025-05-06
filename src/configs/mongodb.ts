import mongose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        const MONGO_DB = process.env.MONGO_DB;
        const MONGO_USER = process.env.MONGO_USER;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
        const MONGO_PORT = process.env.MONGO_PORT || 27017;
        const MONGO_LOCAL = process.env.PRODUCTION_LOCAL;

        let uri = '';

        if (MONGO_LOCAL === undefined) {
            uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`
        } else if(MONGO_LOCAL == 'false') {
            uri = `mongodb://${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`
        } else if(MONGO_LOCAL == 'true') {
            uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`
        }


        console.log('MONGO_LOCAL', MONGO_LOCAL);
        console.log('MONGO_URI', uri);
        

        

        console.log('###########=>>>>>>>>', uri);


        // const conn = await mongose.connect(`mongodb://${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`,{
        // const conn = await mongose.connect(`mongodb://${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`,{
        // const conn = await mongose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}:${MONGO_PORT}/${MONGO_DB}`);
        const conn = await mongose.connect(uri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export default connectDB;