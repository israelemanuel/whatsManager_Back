import dotenv from "dotenv";
if (process.env.PRODUCTION_LOCAL == "true") {
    dotenv.config({
        path: `${__dirname}/.env`
    });
}
