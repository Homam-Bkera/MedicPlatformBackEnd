const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Wallet = sequelize.define("Wallet", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cash: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }

});

Wallet.belongsTo(User, {
    foreignKey: "userId"
});
User.hasOne(Wallet, {
    foreignKey: "userId"
});

module.exports = Wallet;