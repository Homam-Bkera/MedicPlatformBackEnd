const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

});

Category.belongsTo(Storage, {
    foreignKey: "storageId"
});
Storage.hasMany(Category, {
    foreignKey: "storageId"
});

module.exports = Category;