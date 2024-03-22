const sequelize = require("../helpers/db/init");
const Role = require("../helpers/roles");
const { DataTypes } = require("sequelize");
let bcrypt = require("bcryptjs");
const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 8));
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Role.user,
    }
});
module.exports = User;