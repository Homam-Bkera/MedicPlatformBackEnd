const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Storage = sequelize.define("Storage", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
    }
});

module.exports = Storage;
