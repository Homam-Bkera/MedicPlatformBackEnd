const MedicineService = require("../services/medicine");
const CategoryService = require("../services/category");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const responseSender = require("../helpers/wrappers/response-sender").responseSender;
const ResponseSenderWithCredential = require("../helpers/wrappers/response-sender").ResponseSenderWithCredential;
const updateResponseSender = require("../helpers/wrappers/response-sender").updateResponseSender;

module.exports = {
    add: async (req, res) => {
        const { body } = req;
        const category = await new CategoryService({}).getOne(body.categoryId);
        if(category.storageId != req.storageId)
            throw new CustomError(errors.Not_Authorized);
        const result = await new MedicineService({ ...body }).add();
        responseSender(res, result)
    },
    update: async (req, res) => {
        const { id } = req.query;
        const { body } = req;
        const result = await new MedicineService({ ...body }).update(id);
        updateResponseSender(res, 'Medicine');
    },
    getOne: async (req, res) => {
        const { id } = req.query;
        const result = await new MedicineService({}).getOne(id);
        responseSender(res, result);
    },
    getAll: async (req, res) => {
        const result = await new MedicineService({}).getAll();
        responseSender(res, result);
    }
}