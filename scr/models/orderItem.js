const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Order = require("./order");
const Medicine = require("./medicine");

const OrderItem = sequelize.define("OrderItem", {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medicineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});
Order.hasMany(OrderItem, {
    foreignKey: "orderId"
});
OrderItem.belongsTo(Medicine, {
    foreignKey: "medicineId"
});
Medicine.hasMany(OrderItem, {
    foreignKey: "medicineId"
});
module.exports = OrderItem;