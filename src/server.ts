
import express from 'express';
import server from './config/server';
import initMiddlewares from './utils/init_middleware';
import middlewares from './middlewares';
import initRoutes from './utils/init_routes';
import errorHandlers from './middlewares/exceptions';
import allRoutes from './services/routes';
import mongoConfig from './config/mongodb';
import initDatabaseConnection from './connection/database';

const app = express();

initDatabaseConnection(mongoConfig).then(async (connection) => {
    // initialzing local variables
    app.locals.mongoClient = connection;

    // initializing all middlewares
    initMiddlewares(middlewares, app);
    
    // initializing all routes
    initRoutes(allRoutes, app)
    
    // initialing errors handle middlewares
    initMiddlewares(errorHandlers, app);
    
    // start listening
    app.listen(server.port, () => {
        console.log(`${server.name} running on http://${server.host}:${server.port}`);
    })

}).catch((error) => {
    console.log('/* Mongo DB connection */');
})
process.on('uncaughtException', (e) => {
    console.log(e);
});

process.on('unhandledRejection', (e) => {
    console.log(e);
});
