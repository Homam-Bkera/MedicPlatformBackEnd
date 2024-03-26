const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const User = require("./user");
const Storage = require("./storage");

const Order = sequelize.define("Order", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    storageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull:false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        allowNull:false
    },
});

Order.belongsTo(User, {
    foreignKey: "userId"
});
User.hasMany(Order, {
    foreignKey: "userId"
});
Order.belongsTo(Storage, {
    foreignKey: "storageId"
});
Storage.hasMany(Order, {
    foreignKey: "storageId"
});

module.exports = Order;