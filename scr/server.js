const express = require("express");
const sequelize = require("./helpers/db/init");
const { port } = require("../configs.json");
const logger = require('morgan');
const app = express();
const models = require("./models");

// Log requests to the console.
app.use(logger('dev'));
//to synchronizing all models at once
sequelize.sync({ alter: false }).then((_) => {
    console.log("connected to db successfully");
    app.use(express.urlencoded({ extended: false }));
    app.use(require("./routers"));
    app.use(require("./helpers/errors/custom-errors").defaultHandler);
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
        
    });
}).catch(err => {
    console.log("Unable to connect to the database:", err)
});
