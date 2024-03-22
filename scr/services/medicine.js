const Medicine = require("../models/medicine");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors");
const Category = require("../models/category");
const Storage = require("../models/storage");

class MedicineService {
    constructor({ name, categoryId, qty, price }) {
        this.name = name;
        this.categoryId = categoryId;
        this.qty = qty;
        this.price = price;
    }

    async add() {
        return await Medicine.create({
            name: this.name,
            categoryId: this.categoryId,
            qty: this.qty,
            price: this.price
        });
    }

    async update(id) {
        return await Medicine.update({
            name: this.name,
            qty: this.qty,
            price: this.price
        }, { where: { id: id } });
    }
    async updateQty(id, qty, transaction) {
        return await Medicine.update({ qty: qty }, { where: { id: id } }, { transaction: transaction });
    }
    async delete(id) {
        return await Medicine.destroy({ where: { id: id } });
    }
    async deleteByCategoryId(categoryId) {
        return await Medicine.destroy({ where: { categoryId: categoryId } });
    }
    async getOne(id) {
        return await Medicine.findByPk(id, { include: [{ model: Category, required: true, include: { model: Storage, required: true } }] });
    }
    async getAll() {
        return await Medicine.findAll({ include: Category });
    }
}

module.exports = MedicineService;