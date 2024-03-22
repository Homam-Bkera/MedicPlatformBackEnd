const Category = require("../models/category");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors");
const { Op } = require("sequelize");
const Medicine = require("../models/medicine");
class CategoryService {
    constructor({ name, storageId }) {
        this.name = name;
        this.storageId = storageId;
    }
    async add() {
        return await Category.create({
            name: this.name,
            storageId: this.storageId
        });
    }
    async update(id) {
        return await Category.update({
            name: this.name
        }, { where: { id: id } });
    }
    async delete(id) {
        return await Category.destroy({ where: { id: id } });
    }
    async getAllByStorageId(storageId) {
        return await Category.findAll({ where: { storageId: storageId } });
    }
    async getOne(id) {
        return await Category.findByPk(id, { include: { model: Medicine } });
    }

}

module.exports = CategoryService;