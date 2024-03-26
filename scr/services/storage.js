const Storage = require("../models/storage");
const Category = require("../models/category");
const Medicine = require("../models/medicine");
const CategoryService = require("./category");
const MedicineService = require("./medicine");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");

class StorageService {
    constructor({ name, location }) {
        this.name = name;
        this.location = location;
    }

    async add() {
        return await Storage.create({
            name: this.name,
            location: this.location
        });
    }
    async update(id) {
        return await Storage.update({
            name: this.name,
            location: this.location
        }, { where: { id: id } });
    }
    async delete(id) {
        const categories = await new CategoryService({}).getAllByStorageId(id);
        for (let i = 0; i < categories.length; i++) {
            await new MedicineService({}).deleteByCategoryId(categories[i].id);
            await new CategoryService({}).delete(categories[i].id);
        }
        return await Storage.destroy({ where: { id: id } });
    }
    async getAll() {
        return await Storage.findAll();
    }
    async getOne(id) {
        return await Storage.findByPk(id, { include: [{ model: Category, include: { model: Medicine } }] });
    }
}

module.exports = StorageService;