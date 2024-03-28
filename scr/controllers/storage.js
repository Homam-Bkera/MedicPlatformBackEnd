const StorageService = require("../services/storage");
const { responseSender, updateResponseSender } = require("../helpers/wrappers/response-sender");
module.exports = {
    add: async (req, res) => {
        const { body } = req;
        const storage = await new StorageService({ ...body }).add();
        responseSender(res, storage);
    },
    update: async (req, res) => {
        const { id } = req.query;
        const { body } = req;
        const storage = await new StorageService({ ...body }).update(id);
        updateResponseSender(res, 'Storage');
    },
    delete: async (req, res) => {
        const { id } = req.query;
        const result = await new StorageService({}).delete(id);
        responseSender(res, result);
    },
    getAll: async (req, res) => {
        const storages = await new StorageService({}).getAll();
        responseSender(res, storages);
    },
    getOne: async (req, res) => {
        const { id } = req.query;
        const storage = await new StorageService({}).getOne(id);
        responseSender(res, storage);
    }
}