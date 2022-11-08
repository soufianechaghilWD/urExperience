import express from "express";
import mongoose from "mongoose";

export default class App {

    constructor(port, dbUrl, routes) {
        this.app = express();
        this.port = port;
        this.dbUrl = dbUrl;
        this.routes = routes;

        this.initializeMiddleWeares();
        this.connectToDataBase();
        this.initializeRoutes();
        this.errorHandlingMiddleWare();
    }
    
    errorHandling(err, req, res, next) {
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
    
        res.status(status).json({status, message});    
    }

    initializeMiddleWeares() {
        this.app.use(express.json());
    }

    errorHandlingMiddleWare() {
        this.app.use(this.errorHandling);
    }

    connectToDataBase() {
        mongoose.connect(this.dbUrl)
        .then(() => {
            console.log('db connected');
        })
        .catch((err) => {
            console.log('could not connect to db: ', err);
        })
    }

    initializeRoutes() {
        this.routes.forEach(route => {
            this.app.use('/api', route);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('app running on port: ', this.port);
        })
    }

}
