const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");
const User = require("../models/user");

const StorageAdmin = sequelize.define("StorageAdmin", {
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    storageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

});

StorageAdmin.belongsTo(Storage, {
    foreignKey: "storageId"
});
Storage.hasMany(StorageAdmin, {
    foreignKey: "storageId"
});
StorageAdmin.belongsTo(User, {
    foreignKey: "adminId"
});
User.hasMany(StorageAdmin, {
    foreignKey: "adminId"
});
module.exports = StorageAdmin;