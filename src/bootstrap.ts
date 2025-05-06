import dotenv from "dotenv";
if (process.env.PRODUCTION_LOCAL == "true") {
    dotenv.config({
        path: `${__dirname}/.env_prod`
    });
} else if(process.env.PRODUCTION_LOCAL == "false") {
    dotenv.config({
        path: `${__dirname}/.env`
    });
}
