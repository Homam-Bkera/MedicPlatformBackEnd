const CategoryService = require("../services/category");
const MedicineService = require("../services/medicine");
const responseSender = require("../helpers/wrappers/response-sender").responseSender;
const updateResponseSender = require("../helpers/wrappers/response-sender").updateResponseSender;

module.exports = {
    add: async (req, res) => {
        const { body } = req;
        body.storageId = req.storageId;
        const result = await new CategoryService({ ...body }).add();
        responseSender(res, result);
    },
    update: async (req, res) => {
        const { id } = req.query;
        const { body } = req;
        const result = await new CategoryService({ ...body }).update(id);
        updateResponseSender(res, 'Category');
    },
    delete: async (req, res) => {
        const { id } = req.query;
        await new MedicineService({}).deleteByCategoryId(id);
        const result = await new CategoryService({}).delete(id);
        responseSender(res, result);
    },
    getAll: async (req, res) => {
        const { storageId } = req.query;
        const result = await new CategoryService({}).getAllByStorageId(storageId);
        responseSender(res, result);
    },
    getOne: async (req, res) => {
        const { id } = req.query;
        const result = await new CategoryService({}).getOne(id);
        responseSender(res, result);
    }
}