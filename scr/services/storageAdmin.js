const StorageAdmin = require("../models/storageAdmin");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors");

class StorageAdminService {
    constructor({ adminId, storageId }) {
        this.adminId = adminId;
        this.storageId = storageId;
    }

    async add() {
        return await StorageAdmin.create({
            adminId: this.adminId,
            storageId: this.storageId
        });
    }
    async getAdmin(id) {
        return await StorageAdmin.findOne({ where: { adminId: id } });
    }
    async delete(adminId, storageId) {
        return await StorageAdmin.destroy({ where: { adminId: adminId, storageId: storageId } });
    }

}

module.exports = StorageAdminService;