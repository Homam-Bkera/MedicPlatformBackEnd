const User = require("../models/user");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = require("../helpers/db/config.secret");
const Role = require("../helpers/roles");
const { Op } = require("sequelize");
const StorageAdminService = require("./storageAdmin");
const StorageAdmin = require("../models/storageAdmin");
const walletService = require("./wallet");
const Wallet = require("../models/wallet");

class UserService {
    constructor({ name, password, phone, role }) {
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }
    async add() {
        if (!this.name || !this.password || !this.phone) {
            throw new CustomError(errors.You_Should_fill_All_The_Filds)
        }
        return await User.create({
            name: this.name,
            password: this.password,
            phone: this.phone,
            role: this.role
        });
        /*const token = jwt.sign({ userId: user.id }, secretKey, {
            expiresIn: 86400 * 720 // 2 years
        });
        return { user: user, token: token };*/
    }
    async update(id) {
        return await User.update({
            name: this.name,
            password: this.password,
            phone: this.phone,
        }, { where: { id: id } });
    }
    async login() {
        if (!this.phone || !this.password) {
            throw new CustomError(errors.You_Should_fill_All_The_Filds);
        }
        const user = await User.findOne({ where: { phone: this.phone }, include: [{model:Wallet,model:StorageAdmin}] });
        if (!user)
            throw new CustomError(errors.Entity_Not_Found);
        let passwordIsValid = bcrypt.compareSync(
            this.password,
            user.password
        );
        if (!passwordIsValid)
            throw new CustomError(errors.Wrong_Password);
        let token, wallet;
        if (user.role === Role.user || user.role === Role.superAdmin) {
            token = jwt.sign({ userId: user.id }, secretKey, {
                expiresIn: 86400 * 720 // 2 years
            });
        } else {
            const storageAdmin = await new StorageAdminService({}).getAdmin(user.id);
            token = jwt.sign({ userId: user.id, storageId: storageAdmin.storageId }, secretKey, {
                expiresIn: 86400 * 720 // 2 years
            });
        }
        return { user: user, token: token }
    }
    async getById(id) {
        return await User.findByPk(id, { include: Wallet });
    }
}

module.exports = UserService;
