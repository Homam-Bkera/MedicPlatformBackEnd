const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Category = require("./category");

const Medicine = sequelize.define("Medicine", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

Medicine.belongsTo(Category, {
    foreignKey: "categoryId"
});
Category.hasMany(Medicine, {
    foreignKey: "categoryId"
});

module.exports = Medicine;