import express from "express";
import mongoose from "mongoose";
import cors from "cors";

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
        this.app.use(cors());
    }

    errorHandlingMiddleWare() {
        const {app, errorHandling} = this;
        app.use(errorHandling);
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
        const {app, routes} = this;
        routes.forEach(route => {
            app.use('/api', route.router);
        });
    }

    listen() {
        const {app, port} = this;        
        app.listen(port, () => {
            console.log('app running on port: ', port);
        })
    }

}
